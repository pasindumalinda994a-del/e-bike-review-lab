/**
 * Google Sheets integration using Google Apps Script Web App
 * 
 * MUCH EASIER METHOD - No Google Cloud Console needed!
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with headers
 * 2. Add Google Apps Script (Tools > Script Editor)
 * 3. Paste the provided script
 * 4. Deploy as Web App
 * 5. Set environment variable: GOOGLE_WEB_APP_URL
 */

/**
 * Add a new subscriber to Google Sheets via Apps Script Web App
 * @param {string} email - Email address to add
 * @returns {Promise<Object>} Result object with success status
 */
export async function addSubscriberToSheet(email) {
  const webAppUrl = process.env.GOOGLE_WEB_APP_URL;
  
  if (!webAppUrl) {
    console.warn('[Google Sheets] GOOGLE_WEB_APP_URL not set. Skipping sheet update.');
    return { success: true, skipped: true };
  }

  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'newsletter',
        email: email.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    console.error('[Google Sheets] Error adding subscriber:', error);
    // Fail gracefully - don't throw, just log
    return { success: false, error: error.message };
  }
}

/**
 * Check if email already exists (optional - prevents duplicates)
 * Note: This requires the Apps Script to support checking
 * @param {string} email - Email address to check
 * @returns {Promise<boolean>} True if email exists
 */
export async function emailExistsInSheet(email) {
  // Apps Script can handle duplicates checking internally
  // For simplicity, we'll skip this check here
  return false;
}

/**
 * Add a contact form submission to Google Sheets via Apps Script Web App
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Contact name
 * @param {string} contactData.email - Contact email
 * @param {string} contactData.inquiryType - Type of inquiry
 * @param {string} contactData.subject - Message subject
 * @param {string} contactData.message - Message content
 * @returns {Promise<Object>} Result object with success status
 */
export async function addContactToSheet({ name, email, inquiryType, subject, message }) {
  const webAppUrl = process.env.GOOGLE_WEB_APP_URL;
  
  if (!webAppUrl) {
    console.warn('[Google Sheets] GOOGLE_WEB_APP_URL not set. Skipping sheet update.');
    return { success: true, skipped: true };
  }

  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'contact',
        name: name.trim(),
        email: email.toLowerCase().trim(),
        inquiryType: inquiryType.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    console.error('[Google Sheets] Error adding contact:', error);
    // Fail gracefully - don't throw, just log
    return { success: false, error: error.message };
  }
}
