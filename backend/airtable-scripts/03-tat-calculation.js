/**
 * This script is useful for:
 * - Batch calculations
 * - Generating TAT reports
 * - Analyzing process efficiency
 *
 * EXPECTED TABLE STRUCTURE:
 * - Added On (Date/Time) - When candidate was added to the system
 * - Email Sent Time (Date/Time) - When the email was sent
 * - TAT Minutes (Number) - Calculated TAT in minutes
 * - TAT Hours (Number) - Calculated TAT in hours
 * - TAT Days (Number) - Calculated TAT in days
 * - TAT Display (Single line text) - Human-readable TAT (eg "2 hours 30 minutes")
 */

const TABLE_NAME = "Candidates Processed";

// Get the table
let table = base.getTable(TABLE_NAME);

// Query all records
let query = await table.selectRecordsAsync({
    fields: [
        "Candidate Name",
        "Email",
        "Added On",
        "Email Sent Time",
        "TAT Minutes",
        "Interview Round"
    ]
});

console.log(`Found ${query.records.length} total records`);

// Filter records that have both timestamps but no TAT calculated
let recordsToProcess = query.records.filter(record => {
    const addedOn = record.getCellValue("Added On");
    const emailSentTime = record.getCellValue("Email Sent Time");
    const tatMinutes = record.getCellValue("TAT Minutes");

    return addedOn && emailSentTime && !tatMinutes;
});

console.log(`Found ${recordsToProcess.length} records needing TAT calculation`);

// Helper function to calculate time difference
function calculateTAT(addedOnDate, emailSentDate) {
    // Parse dates
    const added = new Date(addedOnDate);
    const sent = new Date(emailSentDate);

    // Calculate difference in milliseconds
    const diffMs = sent - added;

    // Convert to different units
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Calculate remaining hours and minutes for display
    const displayDays = diffDays;
    const displayHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const displayMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
        minutes: diffMinutes,
        hours: diffHours,
        days: diffDays,
        display: formatTATDisplay(displayDays, displayHours, displayMinutes)
    };
}

// Helper function to format TAT for human-readable display
function formatTATDisplay(days, hours, minutes) {
    let parts = [];

    if (days > 0) {
        parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    }
    if (hours > 0) {
        parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    }
    if (minutes > 0 || parts.length === 0) {
        parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    }

    return parts.join(' ');
}

// Process each record
let updatedCount = 0;
let errorCount = 0;
let tatStats = {
    totalMinutes: 0,
    minTAT: Infinity,
    maxTAT: -Infinity,
    records: []
};

for (let record of recordsToProcess) {
    try {
        const candidateName = record.getCellValue("Candidate Name");
        const addedOn = record.getCellValue("Added On");
        const emailSentTime = record.getCellValue("Email Sent Time");
        const interviewRound = record.getCellValue("Interview Round");

        // Calculate TAT
        const tat = calculateTAT(addedOn, emailSentTime);

        // Update the record
        await table.updateRecordAsync(record.id, {
            "TAT Minutes": tat.minutes,
            "TAT Hours": parseFloat(tat.hours.toFixed(2)),
            "TAT Days": parseFloat(tat.days.toFixed(2)),
            "TAT Display": tat.display
        });

        console.log(`✓ ${candidateName} (${interviewRound}): ${tat.display} (${tat.minutes} minutes)`);

        // Update statistics
        tatStats.totalMinutes += tat.minutes;
        tatStats.minTAT = Math.min(tatStats.minTAT, tat.minutes);
        tatStats.maxTAT = Math.max(tatStats.maxTAT, tat.minutes);
        tatStats.records.push({
            name: candidateName,
            round: interviewRound,
            tat: tat.minutes
        });

        updatedCount++;

    } catch (error) {
        console.error(`✗ Error calculating TAT for record ${record.id}:`, error.message);
        errorCount++;
    }
}

// Calculate average TAT
const avgTATMinutes = tatStats.records.length > 0
    ? tatStats.totalMinutes / tatStats.records.length
    : 0;

// Generate statistics report
console.log("\n=== TAT CALCULATION SUMMARY ===");
console.log(`Total records processed: ${recordsToProcess.length}`);
console.log(`Successfully updated: ${updatedCount}`);
console.log(`Errors: ${errorCount}`);

if (tatStats.records.length > 0) {
    console.log("\n=== TAT STATISTICS ===");
    console.log(`Average TAT: ${avgTATMinutes.toFixed(2)} minutes (${(avgTATMinutes / 60).toFixed(2)} hours)`);
    console.log(`Minimum TAT: ${tatStats.minTAT} minutes (${(tatStats.minTAT / 60).toFixed(2)} hours)`);
    console.log(`Maximum TAT: ${tatStats.maxTAT} minutes (${(tatStats.maxTAT / 60).toFixed(2)} hours)`);

    // Sort by TAT to find slowest and fastest
    const sorted = [...tatStats.records].sort((a, b) => b.tat - a.tat);

    console.log("\n=== TOP 5 LONGEST TAT ===");
    sorted.slice(0, 5).forEach((r, i) => {
        console.log(`${i + 1}. ${r.name} (${r.round}): ${r.tat} minutes`);
    });

    console.log("\n=== TOP 5 SHORTEST TAT ===");
    sorted.slice(-5).reverse().forEach((r, i) => {
        console.log(`${i + 1}. ${r.name} (${r.round}): ${r.tat} minutes`);
    });
}

console.log("==============================\n");

// Output markdown summary for Airtable
output.markdown(`
## TAT Calculation Complete

### Summary
- **Total Records Processed:** ${recordsToProcess.length}
- **✓ Successfully Updated:** ${updatedCount}
- **✗ Errors:** ${errorCount}

### TAT Statistics
${tatStats.records.length > 0 ? `
- **Average TAT:** ${avgTATMinutes.toFixed(2)} minutes (${(avgTATMinutes / 60).toFixed(2)} hours)
- **Minimum TAT:** ${tatStats.minTAT} minutes (${(tatStats.minTAT / 60).toFixed(2)} hours)
- **Maximum TAT:** ${tatStats.maxTAT} minutes (${(tatStats.maxTAT / 60).toFixed(2)} hours)

### Performance Insights
- **Target TAT:** < 60 minutes (recommended)
- **Current Performance:** ${avgTATMinutes < 60 ? '✓ Meeting target' : '✗ Exceeds target'}
- **Improvement Opportunity:** ${((tatStats.maxTAT - tatStats.minTAT) / tatStats.maxTAT * 100).toFixed(1)}% variance between fastest and slowest
` : 'No records with TAT data available.'}
`);
