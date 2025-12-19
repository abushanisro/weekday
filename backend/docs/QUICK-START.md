# Quick Start Guide - 5 Minutes Setup

Get the Weekday interview automation running in just 5 minutes!

## Prerequisites

- Airtable account
- MailerSend account
- 5 minutes of your time

---

## Step 1: Airtable Setup (2 minutes)

### Create Base

1. Go to [airtable.com](https://airtable.com)
2. Click "Add a base" → "Start from scratch"
3. Name it: "Weekday Interviews"

### Create Table 1: "Candidates Import"

Click the dropdown next to table name → "Edit table" → Add these fields:

```
✓ Candidate Name (Single line text)
✓ Email (Email)
✓ Interview Rounds (Single line text)
✓ Calendly Link Round 1 (URL)
✓ Calendly Link Round 2 (URL)
✓ Calendly Link Round 3 (URL)
✓ Role (Single line text)
✓ Company (Single line text)
✓ Status (Single select: Active, On Hold, Rejected)
✓ Added On (Date/Time - auto-fill on creation)
✓ Is Processed (Checkbox)
```

### Create Table 2: "Candidates Processed"

Click "+ Add table" and add these fields:

```
✓ Candidate Name (Single line text)
✓ Email (Email)
✓ Interview Round (Single line text)
✓ Round Number (Number)
✓ Calendly Link (URL)
✓ Role (Single line text)
✓ Company (Single line text)
✓ Status (Single select: Pending, Scheduled, Completed, Cancelled)
✓ Added On (Date/Time)
✓ Original Record ID (Single line text)
✓ Email Sent (Checkbox)
✓ Email Sent Time (Date/Time)
✓ Email Status (Single select: Pending, Sent, Failed)
✓ TAT Minutes (Number)
✓ TAT Hours (Number)
✓ TAT Days (Number)
✓ TAT Display (Single line text)
```

---

## Step 2: MailerSend Setup (1 minute)

1. Go to [app.mailersend.com](https://app.mailersend.com)
2. Sign up and verify email
3. Go to **Settings** → **API Tokens**
4. Click "Generate new token"
5. Name: "Weekday Automation"
6. **Copy and save the token** ⚠️ Important!

For testing, note your sandbox email:
- Go to **Domains**
- Copy the trial domain email (e.g., `noreply@trial-xxxxx.mlsender.net`)

---

## Step 3: Install Scripts (2 minutes)

### Automation 1: Data Splitting

1. Click "Automations" (top right)
2. "Create automation"
3. Name: "01 - Split Rounds"
4. Trigger: "When record matches conditions"
   - Table: "Candidates Import"
   - Condition: "Is Processed" is empty
5. Action: "Run a script"
6. Paste script from: `airtable-scripts/01-data-splitting.js`
7. Turn ON

### Automation 2: Send Emails

1. Create new automation
2. Name: "02 - Send Emails"
3. Trigger: "When record matches conditions"
   - Table: "Candidates Processed"
   - Condition 1: "Email Sent" is empty
   - Condition 2: "Calendly Link" is not empty
4. Action: "Run a script"
5. Paste script from: `airtable-scripts/02-mailersend-integration.js`
6. Add input variables:
   - `MAILERSEND_API_TOKEN` = your token
   - `FROM_EMAIL` = your mailersend email
   - `FROM_NAME` = "Weekday Team"
7. Turn ON

### Automation 3: Calculate TAT

1. Create new automation
2. Name: "03 - Calculate TAT"
3. Trigger: "When record is updated"
   - Table: "Candidates Processed"
   - Field: "Email Sent Time"
4. Action: "Run a script"
5. Paste script from: `airtable-scripts/03-tat-calculation.js`
6. Turn ON

---

## Step 4: Test It! (30 seconds)

Add this test record to "Candidates Import":

```
Candidate Name: Test User
Email: your-email@example.com
Interview Rounds: Technical, HR
Calendly Link Round 1: https://calendly.com/test/tech
Calendly Link Round 2: https://calendly.com/test/hr
Role: Software Engineer
Company: Weekday
Status: Active
(Added On will auto-fill)
```

**What should happen:**
1. ✓ 2 records created in "Candidates Processed"
2. ✓ 2 emails sent to your inbox
3. ✓ TAT calculated automatically

---

## Troubleshooting

### Records not splitting?
- Check "Is Processed" is unchecked
- Verify automation is ON
- Check "Interview Rounds" has comma-separated values

### Emails not sending?
- Verify API token is correct
- Check sender email is valid
- Ensure Calendly links exist
- Check MailerSend dashboard for errors

### TAT not calculating?
- Verify both "Added On" and "Email Sent Time" exist
- Check automation trigger is correct
- Run manually to see errors

---

## What's Next?

1. ✅ Import real candidate data
2. ✅ Customize email template
3. ✅ Create monitoring dashboards
4. ✅ Set up failure alerts

---

## Need More Help?

- **Full Guide:** [SETUP-GUIDE.md](SETUP-GUIDE.md)
- **Scripts:** Check inline comments
- **Airtable:** [support.airtable.com](https://support.airtable.com/)
- **MailerSend:** [developers.mailersend.com](https://developers.mailersend.com/)

---

**You're all set! 🎉**

The automation will now:
- Split candidates by rounds
- Send personalized emails
- Track turnaround times

Happy scheduling! 📅
