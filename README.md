**Product Owner:** Abushan
**Contact:** abushan.isro@gmail.com
**Release Date:** December 19, 2025

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Why This Matters](#why-this-matters)
- [Solution](#solution)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Success Metrics](#success-metrics)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
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

## Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm or bun package manager
```

### Installation

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

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production build will be available in the `dist` folder.

---

## Usage

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

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Build Tool:** Vite
- **State Management:** React Hooks
- **Form Handling:** React Hook Form (if applicable)
- **Date Management:** React Day Picker

---

## Dependencies

### Infrastructure Requirements
- Cloud hosting platform
- Database for scheduling data
- Email service for notifications
- Calendar integration (Google Calendar/Outlook)

### Budget Approvals
- Infrastructure costs
- Third-party service subscriptions
- Development resources

### Partner Support
- Calendar API access
- Email service provider
- SMS notifications (optional)

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


## Contact

**Product Owner:** Abushan
**Email:** abushan.isro@gmail.com