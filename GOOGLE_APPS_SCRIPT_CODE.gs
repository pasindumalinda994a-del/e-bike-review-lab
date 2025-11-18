/**
 * Google Apps Script for Newsletter & Contact Form
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire code
 * 5. Click Save (floppy disk icon)
 * 6. Click Deploy > New deployment
 * 7. Click the gear icon > Web app
 * 8. Set description: "Newsletter and Contact Form Handler"
 * 9. Set "Execute as" to: Me
 * 10. Set "Who has access" to: Anyone
 * 11. Click Deploy
 * 12. Copy the Web App URL and use it as GOOGLE_WEB_APP_URL
 */

// Configuration - Update these if needed
const CONFIG = {
  newsletterSheetName: 'Newsletter', // Tab name for newsletter
  contactSheetName: 'Contact Submissions', // Tab name for contact form
};

/**
 * Main function to handle POST requests
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Route to appropriate handler based on action
    if (data.action === 'newsletter') {
      return handleNewsletter(data);
    } else if (data.action === 'contact') {
      return handleContact(data);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle newsletter subscription
 */
function handleNewsletter(data) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(CONFIG.newsletterSheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.newsletterSheetName);
      // Add headers
      sheet.getRange(1, 1, 1, 2).setValues([['Timestamp', 'Email']]);
      sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
    }
    
    // Check for duplicates
    const emails = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat();
    const emailLower = data.email.toLowerCase();
    
    if (emails.some(e => e.toString().toLowerCase() === emailLower)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Email already exists',
        duplicate: true
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new row
    const timestamp = data.timestamp || new Date().toISOString();
    sheet.appendRow([timestamp, data.email]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Newsletter subscription added'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle contact form submission
 */
function handleContact(data) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(CONFIG.contactSheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.contactSheetName);
      // Add headers
      sheet.getRange(1, 1, 1, 6).setValues([[
        'Timestamp',
        'Name',
        'Email',
        'Inquiry Type',
        'Subject',
        'Message'
      ]]);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    
    // Add new row
    const timestamp = data.timestamp || new Date().toISOString();
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.inquiryType || '',
      data.subject || '',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Contact form submission added'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

