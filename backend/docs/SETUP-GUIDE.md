# Weekday Interview Automation - Complete Setup Guide

This guide will walk you through setting up the complete automated workflow for handling interview scheduling and email communication at Weekday.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Airtable Setup](#airtable-setup)
3. [MailerSend Setup](#mailersend-setup)
4. [Script Installation](#script-installation)
5. [Testing the Workflow](#testing-the-workflow)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- [ ] Airtable account (free tier is sufficient for testing)
- [ ] MailerSend account (free tier allows 3,000 emails/month)
- [ ] Access to the candidate dataset CSV
- [ ] Basic understanding of Airtable automations

---

## Airtable Setup

### Step 1: Create Your Airtable Base

1. Go to [Airtable](https://airtable.com/)
2. Click **"Add a base"** → **"Start from scratch"**
3. Name it: **"Weekday Interview Automation"**

### Step 2: Create the Import Table

Create a table named **"Candidates Import"** with the following fields:

| Field Name | Field Type | Description |
|------------|-----------|-------------|
| Candidate Name | Single line text | Full name of the candidate |
| Email | Email | Candidate's email address |
| Interview Rounds | Single line text | Comma-separated rounds (e.g., "Technical, HR, Manager") |
| Calendly Link Round 1 | URL | Link for first interview round |
| Calendly Link Round 2 | URL | Link for second interview round |
| Calendly Link Round 3 | URL | Link for third interview round |
| Role | Single line text | Position being interviewed for |
| Company | Single line text | Company name |
| Status | Single select | Options: Active, On Hold, Rejected |
| Added On | Date/Time | When the record was created |
| Is Processed | Checkbox | Tracks if data has been split |

**Important:** Set "Added On" to auto-fill with the creation time:
- Click on the field settings
- Enable "Include a time field"
- Check "Use the same field for creation and modification times"

### Step 3: Import the Sample Data

1. Download the sample CSV from `sample-data/candidates-sample.csv`
2. In your "Candidates Import" table, click the dropdown arrow next to the table name
3. Select **"Import data"** → **"CSV file"**
4. Upload the CSV and map the columns

### Step 4: Create the Processed Table

Create a second table named **"Candidates Processed"** with these fields:

| Field Name | Field Type | Description |
|------------|-----------|-------------|
| Candidate Name | Single line text | Full name of the candidate |
| Email | Email | Candidate's email address |
| Interview Round | Single line text | Specific round name |
| Round Number | Number | 1, 2, or 3 |
| Calendly Link | URL | Link for this specific round |
| Role | Single line text | Position being interviewed for |
| Company | Single line text | Company name |
| Status | Single select | Options: Pending, Scheduled, Completed, Cancelled |
| Added On | Date/Time | When originally added |
| Original Record ID | Single line text | Reference to source record |
| Email Sent | Checkbox | Whether invitation was sent |
| Email Sent Time | Date/Time | When email was sent |
| Email Status | Single select | Options: Pending, Sent, Failed |
| TAT Minutes | Number | Turnaround time in minutes |
| TAT Hours | Number | Turnaround time in hours (with decimals) |
| TAT Days | Number | Turnaround time in days (with decimals) |
| TAT Display | Single line text | Human-readable TAT |

---

## MailerSend Setup

### Step 1: Create MailerSend Account

1. Go to [MailerSend](https://app.mailersend.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Verify Your Domain (or Use Test Mode)

**Option A: Use a verified domain (Production)**
1. Go to **Domains** in the MailerSend dashboard
2. Click **"Add Domain"**
3. Follow DNS verification steps

**Option B: Use sandbox mode (Testing)**
1. MailerSend provides a sandbox domain for testing
2. Emails will only be sent to verified recipients
3. Add test recipients in **Settings** → **Verified Emails**

### Step 3: Generate API Token

1. Go to **Settings** → **API Tokens**
2. Click **"Generate new token"**
3. Name it: "Weekday Interview Automation"
4. Select **"Full access"** scope (or at minimum: Email Send)
5. **Copy the token** - you'll need it for Airtable
6. **Save it securely** - you won't be able to see it again

### Step 4: Set Up Sender Identity

1. Go to **Email** → **Sending** → **Identities**
2. Add a sender email (e.g., `interviews@yourdomain.com`)
3. If using sandbox, use: `noreply@trial-xxxxx.mlsender.net` (provided by MailerSend)

---

## Script Installation

### Task 1: Data Splitting Automation

1. In your Airtable base, click **"Automations"** in the top right
2. Click **"Create automation"**
3. Name it: **"01 - Split Interview Rounds"**

**Configure Trigger:**
- Trigger: **"When record matches conditions"**
- Table: **"Candidates Import"**
- Conditions:
  - When **"Is Processed"** is empty (unchecked)

**Configure Action:**
- Action: **"Run a script"**
- Copy the entire content from `airtable-scripts/01-data-splitting.js`
- Paste into the script editor

**Important Configuration:**
- Verify table names in the script match your tables:
  ```javascript
  const INPUT_TABLE_NAME = "Candidates Import";
  const OUTPUT_TABLE_NAME = "Candidates Processed";
  ```

4. Click **"Test automation"** with a sample record
5. Turn the automation **ON**

### Task 2: Email Sending Automation

1. Create a new automation
2. Name it: **"02 - Send Interview Invitations"**

**Configure Trigger:**
- Trigger: **"When record matches conditions"**
- Table: **"Candidates Processed"**
- Conditions:
  - When **"Email Sent"** is empty (unchecked)
  - AND **"Calendly Link"** is not empty

**Configure Action:**
- Action: **"Run a script"**
- Copy content from `airtable-scripts/02-mailersend-integration.js`
- Paste into the script editor

**Add Input Variables:**
- Click **"Add input variable"** (3 times for each variable)
- Variable 1:
  - Name: `MAILERSEND_API_TOKEN`
  - Value: Your MailerSend API token
- Variable 2:
  - Name: `FROM_EMAIL`
  - Value: Your verified sender email
- Variable 3:
  - Name: `FROM_NAME`
  - Value: `Weekday Interviews Team`

4. Click **"Test automation"** with a sample record
5. Check your email to verify receipt
6. Turn the automation **ON**

**Rate Limiting Note:**
- Free tier: 1 email/second
- Script includes 1.1 second delay between sends
- For bulk sending, consider upgrading or batching

### Task 3: TAT Calculation Automation

1. Create a new automation
2. Name it: **"03 - Calculate TAT"**

**Configure Trigger:**
- Trigger: **"When record is updated"**
- Table: **"Candidates Processed"**
- Field: **"Email Sent Time"**
- Condition: When **"Email Sent Time"** is not empty

**Configure Action:**
- Action: **"Run a script"**
- Copy content from `airtable-scripts/03-tat-calculation.js`
- Paste into the script editor

4. Click **"Test automation"**
5. Verify TAT fields are populated correctly
6. Turn the automation **ON**

---

## Testing the Workflow

### End-to-End Test

1. **Add a Test Candidate:**
   - Go to "Candidates Import" table
   - Add a new record with your email:
     ```
     Name: Test User
     Email: your-email@example.com
     Interview Rounds: Technical, HR
     Calendly Link Round 1: https://calendly.com/test/round1
     Calendly Link Round 2: https://calendly.com/test/round2
     Role: Test Engineer
     Company: Weekday
     Status: Active
     ```

2. **Verify Data Splitting:**
   - Check "Candidates Processed" table
   - Should see 2 new records (one per round)
   - Verify "Is Processed" is checked in import table

3. **Verify Email Sending:**
   - Wait for automation to trigger (~30 seconds)
   - Check your email inbox
   - Should receive 2 separate emails (one per round)
   - Verify Calendly links are correct

4. **Verify TAT Calculation:**
   - Check "Candidates Processed" table
   - Verify TAT fields are populated:
     - TAT Minutes
     - TAT Hours
     - TAT Days
     - TAT Display (e.g., "5 minutes")

### Expected Results

- ✓ Original record marked as processed
- ✓ Two separate records created
- ✓ Emails sent successfully
- ✓ TAT calculated automatically
- ✓ All timestamps recorded

---

## Troubleshooting

### Data Splitting Issues

**Problem:** Records aren't being split

**Solutions:**
- Verify "Is Processed" checkbox is unchecked
- Check automation is turned ON
- Verify table names match in script
- Check "Interview Rounds" field has comma-separated values

---

**Problem:** Wrong number of records created

**Solutions:**
- Verify interview rounds are comma-separated
- Check for extra spaces in the field
- Ensure Calendly links exist for each round

---

### Email Sending Issues

**Problem:** Emails not sending

**Solutions:**
- Verify MailerSend API token is correct
- Check sender email is verified
- Ensure "Calendly Link" field is not empty
- Check MailerSend dashboard for error messages
- Verify you haven't exceeded rate limits

---

**Problem:** Emails marked as failed

**Solutions:**
- Check recipient email is valid
- Verify Calendly link exists
- Check MailerSend logs for specific error
- Ensure API token has correct permissions

---

**Problem:** Rate limiting errors

**Solutions:**
- Script includes 1.1s delay (free tier safe)
- For bulk operations, consider:
  - Processing in smaller batches
  - Upgrading MailerSend plan
  - Running automation at off-peak hours

---

### TAT Calculation Issues

**Problem:** TAT not calculating

**Solutions:**
- Verify both "Added On" and "Email Sent Time" have values
- Check automation trigger is correct
- Verify field names match script
- Run script manually to see error messages

---

**Problem:** TAT showing negative values

**Solutions:**
- Ensure "Email Sent Time" is after "Added On"
- Check timezone settings in Airtable
- Verify date fields are in correct format

---

## Performance Metrics

### Key Metrics to Track

1. **TAT Statistics:**
   - Average TAT: Target < 60 minutes
   - Min/Max TAT: Identify bottlenecks
   - TAT by round: Compare efficiency

2. **Email Success Rate:**
   - Total sent vs. failed
   - Target: > 95% success rate

3. **Processing Volume:**
   - Records processed per day
   - Peak processing times

### Creating a Dashboard

1. In Airtable, create views for:
   - TAT Analysis (sorted by TAT)
   - Email Status Summary (grouped by status)
   - Daily Volume (grouped by date)

2. Use Airtable's built-in charts for visualization

---

## Best Practices

1. **Data Quality:**
   - Validate emails before import
   - Ensure Calendly links are correct
   - Use consistent round naming

2. **Monitoring:**
   - Check automation logs daily
   - Review failed emails
   - Monitor TAT trends

3. **Optimization:**
   - Set up notifications for failures
   - Create backup automations
   - Document custom modifications

4. **Scaling:**
   - Consider MailerSend paid plan for volume
   - Use Airtable's interface designer for better UX
   - Implement additional error handling

---

## Next Steps

After successful setup:

1. Import your actual candidate data
2. Customize email templates in script 02
3. Set up additional notifications
4. Create reporting dashboards
5. Train team members on the system

---

## Support

For issues specific to:
- **Airtable:** Check [Airtable Support](https://support.airtable.com/)
- **MailerSend:** Check [MailerSend Docs](https://developers.mailersend.com/)
- **These Scripts:** Review the inline comments in each script file

---

## File Structure

```
weekday-assignment/
├── airtable-scripts/
│   ├── 01-data-splitting.js          # Task 1: Split interview rounds
│   ├── 02-mailersend-integration.js  # Task 2: Send emails
│   └── 03-tat-calculation.js         # Task 3: Calculate TAT
├── docs/
│   ├── SETUP-GUIDE.md                # This file
│   └── API-REFERENCE.md              # API documentation
└── sample-data/
    └── candidates-sample.csv         # Sample import data
```

---

**Last Updated:** December 19, 2025
**Version:** 1.0.0
**Author:** Weekday Team
