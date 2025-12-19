/**
 * WEEKDAY ASSIGNMENT - MASTER AUTOMATION SCRIPT

 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    // Table names
    INPUT_TABLE: "Candidates Import",
    OUTPUT_TABLE: "Candidates Processed",

    // MailerSend configuration
    // NOTE: Set these in the automation input variables
    MAILERSEND_API_TOKEN: "", // Set via input.config()
    FROM_EMAIL: "interviews@weekday.works",
    FROM_NAME: "Weekday Interviews Team",

    // Processing limits (to avoid timeouts)
    MAX_RECORDS_PER_RUN: 50,
    EMAIL_DELAY_MS: 1100, // 1.1 seconds (safe for free tier)

    // Feature flags
    ENABLE_DATA_SPLITTING: true,
    ENABLE_EMAIL_SENDING: true,
    ENABLE_TAT_CALCULATION: true
};

// Get configuration from input if available
try {
    const inputConfig = input.config();
    if (inputConfig.MAILERSEND_API_TOKEN) {
        CONFIG.MAILERSEND_API_TOKEN = inputConfig.MAILERSEND_API_TOKEN;
    }
    if (inputConfig.FROM_EMAIL) {
        CONFIG.FROM_EMAIL = inputConfig.FROM_EMAIL;
    }
    if (inputConfig.FROM_NAME) {
        CONFIG.FROM_NAME = inputConfig.FROM_NAME;
    }
} catch (e) {
    console.log("Using default configuration");
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function logSection(title) {
    console.log("\n" + "=".repeat(60));
    console.log(title);
    console.log("=".repeat(60));
}

function logSuccess(message) {
    console.log(`✓ ${message}`);
}

function logError(message) {
    console.log(`✗ ${message}`);
}

function logInfo(message) {
    console.log(`ℹ ${message}`);
}

// ============================================================================
// TASK 1: DATA SPLITTING
// ============================================================================

async function splitInterviewRounds() {
    logSection("TASK 1: DATA SPLITTING");

    const inputTable = base.getTable(CONFIG.INPUT_TABLE);
    const outputTable = base.getTable(CONFIG.OUTPUT_TABLE);

    // Get unprocessed records
    const query = await inputTable.selectRecordsAsync({
        fields: [
            "Candidate Name", "Email", "Interview Rounds",
            "Calendly Link Round 1", "Calendly Link Round 2", "Calendly Link Round 3",
            "Role", "Added On", "Company", "Status", "Is Processed"
        ]
    });

    const unprocessed = query.records.filter(r => !r.getCellValue("Is Processed"));
    const toProcess = unprocessed.slice(0, CONFIG.MAX_RECORDS_PER_RUN);

    logInfo(`Found ${unprocessed.length} unprocessed records`);
    logInfo(`Processing ${toProcess.length} records in this run`);

    let successCount = 0;
    let errorCount = 0;
    let totalCreated = 0;

    for (const record of toProcess) {
        try {
            const roundsField = record.getCellValue("Interview Rounds");
            if (!roundsField) {
                logInfo(`Skipping ${record.id}: No rounds specified`);
                continue;
            }

            const rounds = roundsField.split(',').map(r => r.trim()).filter(r => r.length > 0);
            const calendlyLinks = {
                "Round 1": record.getCellValue("Calendly Link Round 1"),
                "Round 2": record.getCellValue("Calendly Link Round 2"),
                "Round 3": record.getCellValue("Calendly Link Round 3")
            };

            const newRecords = [];

            for (let i = 0; i < rounds.length; i++) {
                const roundName = rounds[i];
                const roundNumber = i + 1;
                let calendlyLink = calendlyLinks[`Round ${roundNumber}`] || "";

                // Smart mapping for named rounds
                if (roundName.toLowerCase().includes("technical")) {
                    calendlyLink = calendlyLinks["Round 1"] || calendlyLink;
                } else if (roundName.toLowerCase().includes("hr")) {
                    calendlyLink = calendlyLinks["Round 2"] || calendlyLink;
                } else if (roundName.toLowerCase().includes("manager")) {
                    calendlyLink = calendlyLinks["Round 3"] || calendlyLink;
                }

                newRecords.push({
                    fields: {
                        "Candidate Name": record.getCellValue("Candidate Name"),
                        "Email": record.getCellValue("Email"),
                        "Interview Round": roundName,
                        "Round Number": roundNumber,
                        "Calendly Link": calendlyLink,
                        "Role": record.getCellValue("Role"),
                        "Added On": record.getCellValue("Added On"),
                        "Company": record.getCellValue("Company"),
                        "Status": record.getCellValue("Status") || "Pending",
                        "Original Record ID": record.id,
                        "Email Sent": false
                    }
                });
            }

            // Create records in batches
            while (newRecords.length > 0) {
                const batch = newRecords.splice(0, 50);
                await outputTable.createRecordsAsync(batch);
                totalCreated += batch.length;
            }

            // Mark as processed
            await inputTable.updateRecordAsync(record.id, {
                "Is Processed": true
            });

            logSuccess(`${record.getCellValue("Candidate Name")}: Created ${rounds.length} record(s)`);
            successCount++;

        } catch (error) {
            logError(`Failed to process ${record.id}: ${error.message}`);
            errorCount++;
        }
    }

    logInfo(`Processed: ${successCount} | Errors: ${errorCount} | Total created: ${totalCreated}`);

    return {
        processed: successCount,
        errors: errorCount,
        created: totalCreated
    };
}

// ============================================================================
// TASK 2: EMAIL SENDING
// ============================================================================

function createEmailTemplate(candidateName, role, company, interviewRound, calendlyLink) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e1e8ed; border-top: none; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
        .info-box { background: #f7fafc; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .footer { text-align: center; padding: 20px; color: #718096; font-size: 14px; border-top: 1px solid #e1e8ed; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">Interview Invitation</h1>
        <p style="margin: 10px 0 0 0;">Weekday Interview Platform</p>
    </div>
    <div class="content">
        <p>Dear <strong>${candidateName}</strong>,</p>
        <p>Congratulations! We are excited to invite you to the next step in our interview process.</p>
        <div class="info-box">
            <p style="margin: 5px 0;"><strong>Position:</strong> ${role}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 5px 0;"><strong>Interview Round:</strong> ${interviewRound}</p>
        </div>
        <div style="text-align: center;">
            <a href="${calendlyLink}" class="cta-button">Schedule Your Interview</a>
        </div>
        <p>Best regards,<br><strong>The Weekday Team</strong></p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Weekday. All rights reserved.</p>
    </div>
</body>
</html>`.trim();
}

async function sendEmail(recipientEmail, recipientName, subject, htmlContent) {
    const response = await fetch("https://api.mailersend.com/v1/email", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.MAILERSEND_API_TOKEN}`
        },
        body: JSON.stringify({
            from: { email: CONFIG.FROM_EMAIL, name: CONFIG.FROM_NAME },
            to: [{ email: recipientEmail, name: recipientName }],
            subject: subject,
            html: htmlContent
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`MailerSend error: ${response.status} - ${error}`);
    }

    return true;
}

async function sendInterviewEmails() {
    logSection("TASK 2: EMAIL SENDING");

    if (!CONFIG.MAILERSEND_API_TOKEN) {
        logError("MailerSend API token not configured. Skipping email sending.");
        return { sent: 0, failed: 0 };
    }

    const table = base.getTable(CONFIG.OUTPUT_TABLE);
    const query = await table.selectRecordsAsync({
        fields: [
            "Candidate Name", "Email", "Interview Round", "Calendly Link",
            "Role", "Company", "Email Sent"
        ]
    });

    const pending = query.records.filter(r => !r.getCellValue("Email Sent"));
    const toProcess = pending.slice(0, CONFIG.MAX_RECORDS_PER_RUN);

    logInfo(`Found ${pending.length} pending emails`);
    logInfo(`Sending ${toProcess.length} emails in this run`);

    let sentCount = 0;
    let failedCount = 0;

    for (const record of toProcess) {
        try {
            const candidateName = record.getCellValue("Candidate Name");
            const email = record.getCellValue("Email");
            const calendlyLink = record.getCellValue("Calendly Link");

            if (!email || !calendlyLink) {
                logInfo(`Skipping ${record.id}: Missing email or Calendly link`);
                continue;
            }

            const role = record.getCellValue("Role") || "Position";
            const company = record.getCellValue("Company") || "Our Company";
            const round = record.getCellValue("Interview Round") || "Interview";

            const subject = `Interview Invitation - ${role} at ${company} (${round})`;
            const html = createEmailTemplate(candidateName, role, company, round, calendlyLink);

            await sendEmail(email, candidateName, subject, html);

            await table.updateRecordAsync(record.id, {
                "Email Sent": true,
                "Email Sent Time": new Date().toISOString(),
                "Email Status": { name: "Sent" }
            });

            logSuccess(`Sent email to ${candidateName} (${email})`);
            sentCount++;

            await sleep(CONFIG.EMAIL_DELAY_MS);

        } catch (error) {
            logError(`Failed to send to ${record.id}: ${error.message}`);
            await table.updateRecordAsync(record.id, {
                "Email Status": { name: "Failed" }
            });
            failedCount++;
        }
    }

    logInfo(`Sent: ${sentCount} | Failed: ${failedCount}`);

    return { sent: sentCount, failed: failedCount };
}

// ============================================================================
// TASK 3: TAT CALCULATION
// ============================================================================

function calculateTAT(addedOn, emailSent) {
    const added = new Date(addedOn);
    const sent = new Date(emailSent);
    const diffMs = sent - added;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = diffMs / (1000 * 60 * 60);
    const days = diffMs / (1000 * 60 * 60 * 24);

    const displayDays = Math.floor(days);
    const displayHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const displayMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let display = [];
    if (displayDays > 0) display.push(`${displayDays} day${displayDays !== 1 ? 's' : ''}`);
    if (displayHours > 0) display.push(`${displayHours} hour${displayHours !== 1 ? 's' : ''}`);
    if (displayMinutes > 0 || display.length === 0) display.push(`${displayMinutes} minute${displayMinutes !== 1 ? 's' : ''}`);

    return {
        minutes,
        hours: parseFloat(hours.toFixed(2)),
        days: parseFloat(days.toFixed(2)),
        display: display.join(' ')
    };
}

async function calculateTATMetrics() {
    logSection("TASK 3: TAT CALCULATION");

    const table = base.getTable(CONFIG.OUTPUT_TABLE);
    const query = await table.selectRecordsAsync({
        fields: [
            "Candidate Name", "Added On", "Email Sent Time", "TAT Minutes"
        ]
    });

    const needsTAT = query.records.filter(r => {
        const addedOn = r.getCellValue("Added On");
        const emailSent = r.getCellValue("Email Sent Time");
        const tatMinutes = r.getCellValue("TAT Minutes");
        return addedOn && emailSent && !tatMinutes;
    });

    logInfo(`Found ${needsTAT.length} records needing TAT calculation`);

    let calculatedCount = 0;
    let errorCount = 0;

    for (const record of needsTAT) {
        try {
            const addedOn = record.getCellValue("Added On");
            const emailSent = record.getCellValue("Email Sent Time");

            const tat = calculateTAT(addedOn, emailSent);

            await table.updateRecordAsync(record.id, {
                "TAT Minutes": tat.minutes,
                "TAT Hours": tat.hours,
                "TAT Days": tat.days,
                "TAT Display": tat.display
            });

            logSuccess(`${record.getCellValue("Candidate Name")}: ${tat.display}`);
            calculatedCount++;

        } catch (error) {
            logError(`Failed to calculate TAT for ${record.id}: ${error.message}`);
            errorCount++;
        }
    }

    logInfo(`Calculated: ${calculatedCount} | Errors: ${errorCount}`);

    return { calculated: calculatedCount, errors: errorCount };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    logSection("WEEKDAY INTERVIEW AUTOMATION - MASTER SCRIPT");
    logInfo(`Started at: ${new Date().toISOString()}`);

    const results = {
        dataSplitting: { processed: 0, errors: 0, created: 0 },
        emailSending: { sent: 0, failed: 0 },
        tatCalculation: { calculated: 0, errors: 0 }
    };

    try {
        // Task 1: Data Splitting
        if (CONFIG.ENABLE_DATA_SPLITTING) {
            results.dataSplitting = await splitInterviewRounds();
        } else {
            logInfo("Data splitting disabled");
        }

        // Task 2: Email Sending
        if (CONFIG.ENABLE_EMAIL_SENDING) {
            results.emailSending = await sendInterviewEmails();
        } else {
            logInfo("Email sending disabled");
        }

        // Task 3: TAT Calculation
        if (CONFIG.ENABLE_TAT_CALCULATION) {
            results.tatCalculation = await calculateTATMetrics();
        } else {
            logInfo("TAT calculation disabled");
        }

        // Final Summary
        logSection("EXECUTION SUMMARY");
        logInfo(`Data Splitting: ${results.dataSplitting.created} records created`);
        logInfo(`Email Sending: ${results.emailSending.sent} emails sent`);
        logInfo(`TAT Calculation: ${results.tatCalculation.calculated} TATs calculated`);
        logInfo(`Completed at: ${new Date().toISOString()}`);

        // Output for Airtable
        output.markdown(`
## Automation Complete

### Data Splitting
- Records processed: ${results.dataSplitting.processed}
- New records created: ${results.dataSplitting.created}
- Errors: ${results.dataSplitting.errors}

### Email Sending
- Emails sent: ${results.emailSending.sent}
- Failed: ${results.emailSending.failed}

### TAT Calculation
- TATs calculated: ${results.tatCalculation.calculated}
- Errors: ${results.tatCalculation.errors}
        `);

    } catch (error) {
        logError(`Fatal error: ${error.message}`);
        throw error;
    }
}

// Run the automation
main();
