**Product Owner:** Abushan
**Contact:** abushan.isro@gmail.com
**Release Date:** December 19, 2025

---

## Table of Contents

- [Overview](#overview)
- [Weekday Coding Assignment](#weekday-coding-assignment)
- [Problem Statement](#problem-statement)
- [Why This Matters](#why-this-matters)
- [Solution](#solution)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Implementation](#implementation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Success Metrics](#success-metrics)
- [Contact](#contact)

---

## Overview

**Weekend** is an interview scheduling system designed to eliminate confusion, delays, and dependency on individual judgment. Inspired by Zomato's operational excellence, this platform creates a systematic playbook that ensures consistent outcomes regardless of who operates it.

### Core Philosophy

> "How to build a system where any average human can produce consistent outcomes even under uncertainty?"

We achieve this by:
- Reducing problems to defined states
- Defining clear actions per state
- Storing everything in one centralized location
- Eliminating subjective judgment
- Adding fallback rules for every scenario

---

## Weekday Coding Assignment

This repository includes a **complete implementation** of the Weekday (YC W21) Founder's Office coding assignment - an automated interview scheduling and email communication system.

### Assignment Overview

Build an automated workflow that:
1. **Cleans and splits data** from CSV by interview rounds
2. **Sends automated emails** to candidates with Calendly links
3. **Calculates TAT** (Turnaround Time) metrics

### Implementation

Located in `weekday-assignment/` directory:

```
weekday-assignment/
├── airtable-scripts/
│   ├── 00-master-automation.js       # Combined workflow
│   ├── 01-data-splitting.js          # Task 1: Split rounds
│   ├── 02-mailersend-integration.js  # Task 2: Send emails
│   └── 03-tat-calculation.js         # Task 3: Calculate TAT
├── docs/
│   ├── SETUP-GUIDE.md                # Complete setup instructions
│   └── QUICK-START.md                # 5-minute quick start
├── sample-data/
│   └── candidates-sample.csv         # Sample import data
└── README.md                         # Assignment documentation
```

### Quick Start

1. **Setup Airtable:** Create two tables (Import + Processed)
2. **Configure MailerSend:** Get API token and verify sender
3. **Install Scripts:** Copy scripts to Airtable automations
4. **Test:** Import sample data and verify workflow

**Full Documentation:** [weekday-assignment/README.md](weekday-assignment/README.md)

### Key Features

- **Automated Data Splitting:** Splits candidates with multiple rounds into separate records
- **Email Automation:** Beautiful HTML emails with MailerSend integration
- **TAT Tracking:** Automatic turnaround time calculation and reporting
- **Error Handling:** Comprehensive logging and failure recovery
- **Rate Limiting:** Free-tier compatible (1 email/second)

### Technologies Used

- **Airtable** - Database and automation platform
- **MailerSend** - Email delivery service
- **JavaScript** - Airtable scripting API
- **Calendly** - Interview scheduling integration

### Deliverables ✓

All assignment requirements completed:
- [x] Airtable base with split and cleaned data
- [x] Script for data splitting (Task 1)
- [x] MailerSend integration (Task 2)
- [x] TAT calculation (Task 3)
- [x] Complete documentation

---

## Problem Statement

### The Challenge: Scheduling Complexity

Interviews must happen between candidates and interviewers at mutually available times. However, traditional scheduling systems fail due to:

**Fragmentation**
- Candidate availability in one place
- Interviewer availability in another
- Multiple sheets and message threads
- Verbal confirmations scattered across platforms

**Ambiguity**
- "Who should schedule this?"
- "Is this time okay?"
- "Should I wait or proceed?"

**Human Uncertainty**
- Interviewers don't respond
- Candidates reschedule
- Scheduling interns become unavailable
- No clear ownership or next steps

---

## Why This Matters

### Current Pain Points

Traditional scheduling systems rely on individual judgment and create dependencies on specific people. This leads to:

- Delayed interview scheduling
- Confusion about ownership
- Inconsistent processes
- Scalability bottlenecks
- Poor candidate experience

### Our Approach

By applying **first-principles thinking**, we've built a system where:

1. **All information lives in one place** - Single source of truth
2. **Every step has a clear owner** - No ambiguity about responsibility
3. **No subjective judgment required** - Predefined rules for all scenarios
4. **Predefined next actions** - Clear workflows for every situation
5. **Anyone can operate identically** - Ram or Shyam produce same results

---

## Solution

### Minimum Building Blocks

**Entities:**
- Candidate
- Interviewer
- Time slot

**Interview Status:**
- Not scheduled
- Waiting for candidate availability
- Waiting for interviewer availability
- Scheduled
- Rescheduled
- Completed
- Cancelled

**Actions:**
- Request availability
- Confirm availability
- Lock time slot
- Notify participants
- Update status

---

## System Architecture

### The Three-Step System

#### Step 1: Centralized Sheet

One comprehensive sheet containing:
- Candidate name
- Role
- Interview round
- Interviewer assignment
- Candidate availability (structured)
- Interviewer availability (structured)
- Final time slot
- Current status
- Owner (Ram/Shyam)
- **Next action** (critical field)

#### Step 2: Remove Human Judgment

Every status has a predefined action:

| Status | Automated Action |
|--------|-----------------|
| Waiting for interviewer availability | Send template A to interviewer |
| Interviewer availability received | Pick earliest overlapping slot |
| Slot confirmed | Send calendar invite |

#### Step 3: Define Ownership Rules

**Uncertainty 1: No Reply**
- If no reply in 24 hours → Automatic follow-up
- If no reply in 48 hours → Escalate/switch interviewer

**Uncertainty 2: Reschedule Request**
- Status reverts to "Waiting for availability"
- Old slot automatically invalidated
- Same process restarts, no exceptions

**Uncertainty 3: Intern Unavailable**
- Sheet is self-explanatory
- Any intern can pick up any row
- Read: Status + Next action = Know what to do

---

## Features

### For Users (Candidates & Interviewers)

- **Real-time tracking** - Monitor scheduling progress
- **Transparent status** - Always know where things stand
- **Automated notifications** - No manual follow-ups needed
- **Self-service rescheduling** - Simple reschedule flow

### For Operations Team

- **Zero confusion** - Clear playbook for every scenario
- **No bottlenecks** - Any team member can handle any interview
- **Audit trail** - Complete history of all actions
- **Network effects** - Build brand through operational excellence

### For Business

- **Operational efficiency** - Reduced time-to-schedule
- **Scalability** - System works at any volume
- **Brand building** - Exceptional candidate experience
- **Data insights** - Track and optimize scheduling metrics

---

## Implementation

This project showcases two complementary approaches to solving interview scheduling:

### 1. Conceptual Framework (This Repository)

A **React + TypeScript** frontend demonstrating the systematic approach to interview scheduling:

- **Visual Interface:** Modern UI built with React and shadcn/ui components
- **Design System:** Showcases the conceptual workflow and user experience
- **Architecture Documentation:** Detailed system design and first-principles thinking

**Tech Stack:**
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library

### 2. Working Implementation (Weekday Assignment)

A **fully functional automation system** using Airtable and MailerSend:

- **Production Ready:** Complete scripts for automated workflow
- **Real Email Sending:** MailerSend API integration with beautiful templates
- **Data Processing:** Automated splitting, tracking, and metrics
- **Zero-Code Deployment:** Works entirely within Airtable platform

**Tech Stack:**
- Airtable (Database + Automations)
- MailerSend (Email delivery)
- JavaScript (Airtable Scripting API)
- Calendly (Scheduling integration)

### Repository Structure

```
weekend/
├── src/                          # React frontend (conceptual)
│   ├── components/              # UI components
│   ├── pages/                   # Page components
│   └── ...
├── weekday-assignment/          # Working implementation
│   ├── airtable-scripts/       # Automation scripts (Tasks 1-3)
│   ├── docs/                   # Setup guides
│   └── sample-data/            # Test data
├── public/                      # Static assets
└── README.md                    # This file
```

### Which Implementation Should You Use?

**For Learning & Design:**
- Use the React frontend to understand the conceptual framework
- Review the architecture documentation
- Study the first-principles approach

**For Production:**
- Use the Weekday Assignment scripts
- Deploy to Airtable for immediate functionality
- Customize email templates and workflows

---

## Getting Started

### Frontend Application

#### Prerequisites

```bash
Node.js >= 18.0.0
npm or bun package manager
```

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weekend.git

# Navigate to project directory
cd weekend

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

#### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production build will be available in the `dist` folder.

### Weekday Assignment Setup

For the **working automation system**, follow these steps:

#### Quick Setup (5 minutes)

1. **Navigate to the assignment folder:**
   ```bash
   cd weekday-assignment
   ```

2. **Read the Quick Start Guide:**
   - Open `docs/QUICK-START.md`
   - Follow the 5-minute setup process

3. **Setup Airtable:**
   - Create account at [airtable.com](https://airtable.com)
   - Create two tables: "Candidates Import" and "Candidates Processed"
   - Import sample CSV from `sample-data/candidates-sample.csv`

4. **Setup MailerSend:**
   - Create account at [mailersend.com](https://app.mailersend.com)
   - Generate API token
   - Verify sender email or use sandbox mode

5. **Install Automation Scripts:**
   - Copy scripts from `airtable-scripts/` to Airtable automations
   - Configure triggers and input variables
   - Test with sample data

#### Complete Documentation

For detailed setup instructions, see:
- **Quick Start:** `weekday-assignment/docs/QUICK-START.md`
- **Full Setup Guide:** `weekday-assignment/docs/SETUP-GUIDE.md`
- **Assignment README:** `weekday-assignment/README.md`

---

## Usage

### Frontend Application (Conceptual)

### For Scheduling Coordinators

1. **Add new interview request** to the central sheet
2. **Check "Next Action"** column for your task
3. **Execute the action** following the template
4. **Update status** after completion
5. System automatically determines next step

### For Candidates

1. Receive availability request
2. Submit available time slots
3. Receive automated confirmation
4. Can request reschedule anytime

### For Interviewers

1. Receive availability request
2. Submit available time slots
3. Receive calendar invite automatically
4. Can request reschedule with predefined flow

### Weekday Assignment (Production System)

#### Automated Workflow

Once configured, the system automatically:

1. **Data Import:** Upload CSV to Airtable "Candidates Import" table
2. **Auto-Split:** Script 01 splits candidates by interview rounds
3. **Auto-Email:** Script 02 sends personalized invitations with Calendly links
4. **Auto-Track:** Script 03 calculates TAT metrics in real-time

#### Monitoring

Track these metrics in Airtable:
- **Email Status:** Sent, Failed, Pending
- **TAT Metrics:** Minutes, hours, days (with human-readable format)
- **Processing Status:** Which records have been processed
- **Error Logs:** Automation run history

#### Manual Operations

**Batch Processing:**
- Use the master automation script (`00-master-automation.js`)
- Run all three tasks in sequence
- Useful for bulk imports or recovery

**Individual Tasks:**
- Trigger automations individually for specific operations
- Reprocess failed emails
- Recalculate TAT for specific records

---

## Success Metrics

### Primary KPIs

**Speed**
- Time from request to scheduled interview
- Average response time

**Quality**
- Successful interview completion rate
- Reschedule frequency

**Efficiency**
- Coordinator hours per interview scheduled
- System adoption rate

### Guardrail Metrics

- Candidate satisfaction score
- Interviewer satisfaction score
- System error rate
- Escalation frequency

## Tech Stack

### Frontend Application (Conceptual)

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Build Tool:** Vite
- **State Management:** React Hooks
- **Component Library:** Radix UI
- **Icons:** Lucide React
- **Form Handling:** React Hook Form + Zod
- **Date Management:** React Day Picker

### Weekday Assignment (Production)

- **Platform:** Airtable (Database + Automations)
- **Email Service:** MailerSend API
- **Scripting:** JavaScript (Airtable Scripting API)
- **Scheduling:** Calendly Integration
- **Data Format:** CSV Import/Export

---

## Dependencies

### Frontend Application

**Infrastructure:**
- Static hosting (Vercel, Netlify, or similar)
- CDN for asset delivery
- Optional: Backend API for data persistence

**Development:**
- Node.js 18+ environment
- Package manager (npm/bun/yarn)

### Weekday Assignment

**Required (Free Tier Available):**
- **Airtable Account:** Database and automation platform
  - Free tier: 1,200 records/base
  - Unlimited automations
- **MailerSend Account:** Email delivery service
  - Free tier: 3,000 emails/month
  - API access included
- **Calendly:** Interview scheduling (freemium)

**Optional:**
- Custom domain for email sender verification
- Paid tiers for higher volume (production use)

---

## Philosophy: First Principles Applied

This project demonstrates that exceptional operations arent about hiring exceptional people - they're about building exceptional systems.

**Key Learnings:**
1. **Systems > Individuals** - Good systems make average people produce great results
2. **States > Stories** - Define clear states, not narratives
3. **Rules > Judgment** - Predefined rules eliminate uncertainty
4. **Transparency > Trust** - Visible processes build confidence
5. **Automation > Heroics** - Remove dependency on individual heroics

---


## Project Summary

This repository contains:

1. **Conceptual Framework:** A React-based frontend showcasing systematic interview scheduling design
2. **Working Implementation:** Complete Airtable automation for the Weekday coding assignment
3. **Documentation:** Comprehensive guides for both systems

### What's Included

**Frontend Application:**
- Modern UI demonstrating the scheduling workflow
- Architecture documentation
- First-principles design approach

**Weekday Assignment (Production):**
- ✅ Data splitting automation (Task 1)
- ✅ Email sending with MailerSend (Task 2)
- ✅ TAT calculation and tracking (Task 3)
- ✅ Complete setup guides and documentation
- ✅ Sample data for testing

### Next Steps

**For Learning:**
1. Explore the frontend application in `src/`
2. Review the architecture and philosophy sections
3. Study the first-principles approach

**For Production Use:**
1. Navigate to `weekday-assignment/`
2. Follow the Quick Start guide
3. Deploy to Airtable and start automating

---

## Contact

**Product Owner:** Abushan
**Email:** abushan.isro@gmail.com

**Assignment:** Weekday (YC W21) Founder's Office Coding Assignment
**Date:** December 19, 2025

---

**Built with systems thinking and first-principles approach.**