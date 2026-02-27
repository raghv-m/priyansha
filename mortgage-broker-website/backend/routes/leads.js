const express = require('express');
const { body, validationResult } = require('express-validator');
const { addLeadToSheet } = require('../utils/googleSheets');
const { sendNotificationEmail } = require('../utils/emailService');
const { randomUUID } = require('crypto');

const router = express.Router();

// Validation middleware for lead submission
const validateLead = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .trim()
    .matches(/^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/)
    .withMessage('Please provide a valid phone number'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
];

// POST /api/leads - Submit a new lead
router.post('/leads', validateLead, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, message, type = 'lead' } = req.body;

    // Prepare lead data
    const leadData = {
      name,
      email,
      phone,
      message: message || '',
      type,
      submittedAt: new Date().toISOString()
    };

    // Save to Google Sheets
    await addLeadToSheet(leadData);

    // Send notification emails
    await sendNotificationEmail(leadData);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: randomUUID()
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    
    // Return appropriate error response
    if (error.code === 'GOOGLE_SHEET_ERROR') {
      return res.status(500).json({
        error: 'Failed to save lead to database',
        details: error.message
      });
    }
    
    if (error.code === 'EMAIL_ERROR') {
      return res.status(500).json({
        error: 'Failed to send notification email',
        details: error.message
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;