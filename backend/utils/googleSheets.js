const { google } = require('googleapis');

// Google Sheets API configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Create JWT client for authentication
function authenticateGoogleSheets() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials are missing. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.');
  }

  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines
    SCOPES
  );

  return jwtClient;
}

// Function to add a lead to Google Sheets
async function addLeadToSheet(leadData) {
  try {
    // Authenticate and create sheets client
    const auth = authenticateGoogleSheets();
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data in the order of columns in the sheet
    const rowData = [
      leadData.submittedAt,
      leadData.name,
      leadData.email,
      leadData.phone,
      leadData.message,
      leadData.type
    ];

    // Append the row to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Leads!A:F', // Adjust range as needed
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData]
      }
    });

    console.log(`Lead added to Google Sheets: ${response.data.updates.updatedCells} cells updated`);
    return response.data;
  } catch (error) {
    console.error('Error adding lead to Google Sheets:', error);
    throw {
      code: 'GOOGLE_SHEET_ERROR',
      message: error.message,
      details: error
    };
  }
}

// Function to get all leads from Google Sheets (for admin purposes)
async function getAllLeads(adminSecret) {
  // Check if admin secret is provided and valid
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    throw {
      code: 'UNAUTHORIZED',
      message: 'Invalid admin secret provided',
      status: 401
    };
  }
  
  try {
    const auth = authenticateGoogleSheets();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Leads!A:F'
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Convert rows to objects
    const leads = rows.slice(1).map(row => ({
      submittedAt: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      message: row[4],
      type: row[5]
    }));

    return leads;
  } catch (error) {
    console.error('Error getting leads from Google Sheets:', error);
    throw {
      code: 'GOOGLE_SHEET_ERROR',
      message: error.message,
      details: error
    };
  }
}

module.exports = {
  addLeadToSheet,
  getAllLeads
};