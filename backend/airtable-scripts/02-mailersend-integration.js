/**
 ENVIRONMENT VARIABLES NEEDED:
 * - MAILERSEND_API_TOKEN: Your MailerSend API token
 * - FROM_EMAIL: Your verified sender email (e.g., interviews@weekday.works)
 * - FROM_NAME: Sender name (e.g., "Weekday Interviews Team")
 *
 * EXPECTED TABLE STRUCTURE:
 * - Candidate Name (Single line text)
 * - Email (Email field)
 * - Interview Round (Single line text)
 * - Calendly Link (URL)
 * - Role (Single line text)
 * - Company (Single line text)
 * - Email Sent (Checkbox)
 * - Email Sent Time (Date/Time)
 * - Added On (Date/Time)
 * - Email Status (Single select: "Sent", "Failed", "Pending")
 */

const TABLE_NAME = "Candidates Processed";

// Get configuration from environment variables or script input
// In Airtable, you can configure these in the automation settings
let config = input.config();

const MAILERSEND_API_TOKEN = config.MAILERSEND_API_TOKEN || process.env.MAILERSEND_API_TOKEN;
const FROM_EMAIL = config.FROM_EMAIL || "interviews@weekday.works";
const FROM_NAME = config.FROM_NAME || "Weekday Interviews Team";

// Validate configuration
if (!MAILERSEND_API_TOKEN) {
    throw new Error("MailerSend API token is required. Please set MAILERSEND_API_TOKEN.");
}

// Get the table
let table = base.getTable(TABLE_NAME);

// Query records that need emails sent
let query = await table.selectRecordsAsync({
    fields: [
        "Candidate Name",
        "Email",
        "Interview Round",
        "Calendly Link",
        "Role",
        "Company",
        "Email Sent",
        "Added On",
        "Round Number"
    ]
});

// Filter for records where email hasn't been sent
let pendingRecords = query.records.filter(record => {
    return !record.getCellValue("Email Sent");
});

console.log(`Found ${pendingRecords.length} candidate(s) to email`);

// Helper function to create email HTML template
function createEmailTemplate(candidateName, role, company, interviewRound, calendlyLink) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e8ed;
            border-top: none;
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .cta-button:hover {
            background: #5568d3;
        }
        .info-box {
            background: #f7fafc;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #718096;
            font-size: 14px;
            border-top: 1px solid #e1e8ed;
        }
        .highlight {
            color: #667eea;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0; font-size: 28px;">Interview Invitation</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Weekday Interview Platform</p>
    </div>

    <div class="content">
        <p>Dear <strong>${candidateName}</strong>,</p>

        <p>Congratulations! We are excited to invite you to the next step in our interview process.</p>

        <div class="info-box">
            <p style="margin: 5px 0;"><strong>Position:</strong> <span class="highlight">${role}</span></p>
            <p style="margin: 5px 0;"><strong>Company:</strong> <span class="highlight">${company}</span></p>
            <p style="margin: 5px 0;"><strong>Interview Round:</strong> <span class="highlight">${interviewRound}</span></p>
        </div>

        <p>Please schedule your interview at your convenience using the link below:</p>

        <div style="text-align: center;">
            <a href="${calendlyLink}" class="cta-button">Schedule Your Interview</a>
        </div>

        <p><strong>What to expect:</strong></p>
        <ul>
            <li>Click the button above to view available time slots</li>
            <li>Select a time that works best for you</li>
            <li>You will receive a calendar invitation automatically</li>
            <li>The interview will be conducted via the platform specified in the invite</li>
        </ul>

        <p><strong>Important notes:</strong></p>
        <ul>
            <li>Please schedule your interview within the next 48 hours</li>
            <li>If you need to reschedule, you can do so directly through the Calendly link</li>
            <li>Ensure you have a stable internet connection for the interview</li>
        </ul>

        <p>If you have any questions or encounter any issues, please don't hesitate to reach out to us by replying to this email.</p>

        <p>We look forward to speaking with you!</p>

        <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The Weekday Team</strong>
        </p>
    </div>

    <div class="footer">
        <p>This is an automated email from Weekday's interview scheduling system.</p>
        <p>© ${new Date().getFullYear()} Weekday. All rights reserved.</p>
    </div>
</body>
</html>
    `.trim();
}

// Helper function to send email via MailerSend API
async function sendEmail(recipientEmail, recipientName, subject, htmlContent) {
    const url = "https://api.mailersend.com/v1/email";

    const emailData = {
        from: {
            email: FROM_EMAIL,
            name: FROM_NAME
        },
        to: [
            {
                email: recipientEmail,
                name: recipientName
            }
        ],
        subject: subject,
        html: htmlContent,
        text: htmlContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERSEND_API_TOKEN}`
        },
        body: JSON.stringify(emailData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`MailerSend API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
}

// Process each pending record
let successCount = 0;
let failureCount = 0;

for (let record of pendingRecords) {
    try {
        const candidateName = record.getCellValue("Candidate Name");
        const email = record.getCellValue("Email");
        const interviewRound = record.getCellValue("Interview Round") || "Interview";
        const calendlyLink = record.getCellValue("Calendly Link");
        const role = record.getCellValue("Role") || "Position";
        const company = record.getCellValue("Company") || "Our Company";

        // Validate required fields
        if (!email) {
            console.log(`Skipping record ${record.id}: No email address`);
            continue;
        }

        if (!calendlyLink) {
            console.log(`Skipping record ${record.id}: No Calendly link`);
            await table.updateRecordAsync(record.id, {
                "Email Status": { name: "Failed" }
            });
            failureCount++;
            continue;
        }

        // Create email content
        const subject = `Interview Invitation - ${role} at ${company} (${interviewRound})`;
        const htmlContent = createEmailTemplate(candidateName, role, company, interviewRound, calendlyLink);

        // Send the email
        console.log(`Sending email to ${candidateName} (${email}) for ${interviewRound}...`);
        await sendEmail(email, candidateName, subject, htmlContent);

        // Get current timestamp for "Mail Sent Time"
        const currentTime = new Date().toISOString();

        // Update the record to mark email as sent
        await table.updateRecordAsync(record.id, {
            "Email Sent": true,
            "Email Sent Time": currentTime,
            "Email Status": { name: "Sent" }
        });

        console.log(`✓ Email sent successfully to ${candidateName}`);
        successCount++;

        // Add a small delay to avoid rate limiting (MailerSend free tier: 1 email/second)
        await new Promise(resolve => setTimeout(resolve, 1100));

    } catch (error) {
        console.error(`✗ Failed to send email for record ${record.id}:`, error.message);

        // Mark as failed
        await table.updateRecordAsync(record.id, {
            "Email Status": { name: "Failed" }
        });

        failureCount++;
    }
}

// Summary
console.log("\n=== EMAIL SENDING SUMMARY ===");
console.log(`Total candidates processed: ${pendingRecords.length}`);
console.log(`Emails sent successfully: ${successCount}`);
console.log(`Failed: ${failureCount}`);
console.log("============================\n");

output.markdown(`
## Email Sending Complete

- **Total Records:** ${pendingRecords.length}
- **✓ Sent:** ${successCount}
- **✗ Failed:** ${failureCount}
`);
