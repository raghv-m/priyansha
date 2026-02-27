const nodemailer = require('nodemailer');

// Create transporter for sending emails
function createTransporter() {
  // Check if we have SendGrid API key
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransporter({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'apikey', // SendGrid requires this
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  
  // Fallback to generic SMTP if SendGrid is not configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  
  // If no email configuration is provided, throw an error
  throw new Error('Email configuration is missing. Please set SENDGRID_API_KEY or SMTP_* environment variables.');
}

// Function to send notification emails
async function sendNotificationEmail(leadData) {
  try {
    const transporter = createTransporter();
    
    // Email to business (notification)
    const businessEmail = {
      from: process.env.EMAIL_FROM || '"PrimeMortgage" <noreply@primemortgage.ca>',
      to: process.env.BUSINESS_EMAIL || 'info@primemortgage.ca', // Business email
      subject: `New Lead Submission: ${leadData.name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Type:</strong> ${leadData.type}</p>
        <p><strong>Submitted At:</strong> ${leadData.submittedAt}</p>
        <p><strong>Message:</strong></p>
        <p>${leadData.message || 'No message provided'}</p>
        <hr>
        <p>This is an automated message from PrimeMortgage Lead System.</p>
      `
    };
    
    // Email to customer (confirmation)
    const customerEmail = {
      from: process.env.EMAIL_FROM || '"PrimeMortgage" <noreply@primemortgage.ca>',
      to: leadData.email,
      subject: 'Thank You for Your Inquiry - PrimeMortgage',
      html: `
        <h2>Thank You for Your Inquiry!</h2>
        <p>Hello ${leadData.name},</p>
        <p>Thank you for contacting PrimeMortgage. We have received your inquiry and will get back to you as soon as possible.</p>
        <p>We typically respond within 24 hours during business days.</p>
        <p><strong>Your Details:</strong></p>
        <p>Name: ${leadData.name}</p>
        <p>Email: ${leadData.email}</p>
        <p>Phone: ${leadData.phone}</p>
        <p>Message: ${leadData.message || 'No message provided'}</p>
        <p>If you have any urgent questions, please feel free to call us at (416) 555-0123.</p>
        <br>
        <p>Best regards,<br>The PrimeMortgage Team</p>
        <hr>
        <p>This is an automated confirmation. Please do not reply to this email.</p>
      `
    };
    
    // Send both emails
    const [businessResult, customerResult] = await Promise.allSettled([
      transporter.sendMail(businessEmail),
      transporter.sendMail(customerEmail)
    ]);
    
    // Check for errors
    if (businessResult.status === 'rejected') {
      console.error('Failed to send business notification:', businessResult.reason);
    } else {
      console.log('Business notification sent successfully');
    }
    
    if (customerResult.status === 'rejected') {
      console.error('Failed to send customer confirmation:', customerResult.reason);
    } else {
      console.log('Customer confirmation sent successfully');
    }
    
    // Throw error if both emails failed to send
    if (businessResult.status === 'rejected' && customerResult.status === 'rejected') {
      throw new Error(`Failed to send emails: business: ${businessResult.reason.message}, customer: ${customerResult.reason.message}`);
    }
    
    return {
      businessSent: businessResult.status === 'fulfilled',
      customerSent: customerResult.status === 'fulfilled',
      businessError: businessResult.status === 'rejected' ? businessResult.reason.message : null,
      customerError: customerResult.status === 'rejected' ? customerResult.reason.message : null
    };
  } catch (error) {
    console.error('Error sending notification emails:', error);
    throw {
      code: 'EMAIL_ERROR',
      message: error.message,
      details: error
    };
  }
}

module.exports = {
  sendNotificationEmail
};