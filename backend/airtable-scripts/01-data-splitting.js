/**

 * TABLE STRUCTURE:
 * - Candidate Name (Single line text)
 * - Email (Email field)
 * - Interview Rounds (Single line text) - Format: "Round 1, Round 2, Round 3" or "Technical, HR"
 * - Calendly Link Round 1 (URL)
 * - Calendly Link Round 2 (URL)
 * - Calendly Link Round 3 (URL)
 * - Role (Single line text)
 * - Added On (Date/Time field)
 * - Status (Single select)
 * - Company (Single line text)
 * - Is Processed (Checkbox) - To track which records have been split
 */

// Define your input and output table names
const INPUT_TABLE_NAME = "Candidates Import"; // Original data table
const OUTPUT_TABLE_NAME = "Candidates Processed"; // Split data table

// Get the tables
let inputTable = base.getTable(INPUT_TABLE_NAME);
let outputTable = base.getTable(OUTPUT_TABLE_NAME);

// Query records that haven't been processed yet
let query = await inputTable.selectRecordsAsync({
    fields: [
        "Candidate Name",
        "Email",
        "Interview Rounds",
        "Calendly Link Round 1",
        "Calendly Link Round 2",
        "Calendly Link Round 3",
        "Role",
        "Added On",
        "Company",
        "Status",
        "Is Processed"
    ]
});

// Filter for unprocessed records
let unprocessedRecords = query.records.filter(record => {
    return !record.getCellValue("Is Processed");
});

console.log(`Found ${unprocessedRecords.length} unprocessed records to split`);

// Process each unprocessed record
for (let record of unprocessedRecords) {
    try {
        // Get the interview rounds field
        let roundsField = record.getCellValue("Interview Rounds");

        if (!roundsField) {
            console.log(`Skipping record ${record.id}: No interview rounds specified`);
            continue;
        }

        // Parse interview rounds - could be "Round 1, Round 2, Round 3" or "Technical, HR"
        let rounds = roundsField.split(',').map(r => r.trim()).filter(r => r.length > 0);

        console.log(`Processing ${record.getCellValue("Candidate Name")}: ${rounds.length} round(s)`);

        // Get all calendly links
        let calendlyLinks = {
            "Round 1": record.getCellValue("Calendly Link Round 1"),
            "Round 2": record.getCellValue("Calendly Link Round 2"),
            "Round 3": record.getCellValue("Calendly Link Round 3")
        };

        // Create a new record for each round
        let newRecords = [];

        for (let i = 0; i < rounds.length; i++) {
            let roundName = rounds[i];
            let roundNumber = i + 1;

            // Determine which Calendly link to use
            let calendlyLink = calendlyLinks[`Round ${roundNumber}`] || "";

            // If the round name includes "Technical", "HR", "Manager", etc., try to map it
            if (roundName.toLowerCase().includes("technical") || roundName.toLowerCase().includes("tech")) {
                calendlyLink = calendlyLinks["Round 1"] || calendlyLink;
            } else if (roundName.toLowerCase().includes("hr") || roundName.toLowerCase().includes("human")) {
                calendlyLink = calendlyLinks["Round 2"] || calendlyLink;
            } else if (roundName.toLowerCase().includes("manager") || roundName.toLowerCase().includes("final")) {
                calendlyLink = calendlyLinks["Round 3"] || calendlyLink;
            }

            // Prepare the new record
            let newRecord = {
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
                    "Email Sent": false // Will be used in Task 2
                }
            };

            newRecords.push(newRecord);
        }

        // Batch create records (max 50 at a time per Airtable limits)
        if (newRecords.length > 0) {
            while (newRecords.length > 0) {
                let batch = newRecords.splice(0, 50);
                await outputTable.createRecordsAsync(batch);
            }

            console.log(`Created ${rounds.length} record(s) for ${record.getCellValue("Candidate Name")}`);

            // Mark the original record as processed
            await inputTable.updateRecordAsync(record.id, {
                "Is Processed": true
            });
        }

    } catch (error) {
        console.error(`Error processing record ${record.id}:`, error);
    }
}

console.log("Data splitting completed!");
console.log(`Total records processed: ${unprocessedRecords.length}`);
