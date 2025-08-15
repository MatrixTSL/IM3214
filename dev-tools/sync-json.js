/**
 * JSON Sync Script - Updates embedded JSON in HTML files from external JSON
 * Run this after making changes to JSON files to sync them to HTML
 */

const fs = require('fs');
const path = require('path');

function syncJSONToHTML(jsonFilePath, htmlFilePath) {
    try {
        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        
        // Read the HTML file
        let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        
        // Find the embedded JSON data section
        const startMarker = 'const worksheetJSONData = {';
        const endMarker = '};';
        
        const startIndex = htmlContent.indexOf(startMarker);
        if (startIndex === -1) {
            console.error(`Could not find embedded JSON in ${htmlFilePath}`);
            return false;
        }
        
        // Find the end of the JSON object
        let braceCount = 0;
        let endIndex = startIndex + startMarker.length;
        for (let i = endIndex; i < htmlContent.length; i++) {
            if (htmlContent[i] === '{') braceCount++;
            if (htmlContent[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    endIndex = i + 1;
                    break;
                }
            }
        }
        
        // Replace the embedded JSON
        const newEmbeddedJSON = `const worksheetJSONData = ${JSON.stringify(jsonData, null, 2)};`;
        const newHtmlContent = htmlContent.substring(0, startIndex) + 
                              newEmbeddedJSON + 
                              htmlContent.substring(endIndex);
        
        // Write back to HTML file
        fs.writeFileSync(htmlFilePath, newHtmlContent, 'utf8');
        
        console.log(`✅ Synced ${jsonFilePath} to ${htmlFilePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error syncing ${jsonFilePath} to ${htmlFilePath}:`, error.message);
        return false;
    }
}

function syncAllWorksheets() {
    const worksheets = [
        { json: 'dev-tools/worksheet-1-qa-export.json', html: 'worksheet-1.html' },
        { json: 'dev-tools/worksheet-1-qa-export.json', html: 'worksheet-1-json.html' }
    ];
    
    console.log('🔄 Syncing JSON files to HTML worksheets...\n');
    
    let successCount = 0;
    for (const worksheet of worksheets) {
        if (fs.existsSync(worksheet.json) && fs.existsSync(worksheet.html)) {
            if (syncJSONToHTML(worksheet.json, worksheet.html)) {
                successCount++;
            }
        } else {
            console.log(`⚠️  Skipping ${worksheet.html} - files not found`);
        }
    }
    
    console.log(`\n🎉 Sync complete! ${successCount}/${worksheets.length} files updated.`);
    console.log('📝 Remember to refresh your browser to see changes.');
}

// Run the sync
syncAllWorksheets();
