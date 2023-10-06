function openCSVImportSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle('CSV Column Import and Filter')
        .setWidth(450);
    SpreadsheetApp.getUi().showSidebar(html);
}

function importAndFilterCSV(csvData, selectedColumns, filterColumn, filterValue) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var lines = csvData.split('\n');
    var headers = lines[0].split(',');
    
    var columnIndexes = [];
    
    selectedColumns.forEach(function(selectedColumn) {
        var index = headers.indexOf(selectedColumn);
        if (index !== -1) {
            columnIndexes.push(index);
        }
    });
    
    var filterColumnIndex = headers.indexOf(filterColumn);
    
    for (var i = 1; i < lines.length; i++) {
        var row = lines[i].split(',');
        
        if (!filterColumn || (filterColumnIndex !== -1 && row[filterColumnIndex] === filterValue)) {
            var rowData = [];
            
            columnIndexes.forEach(function(index) {
                rowData.push(row[index]);
            });
            
            sheet.appendRow(rowData);
        }
    }
}
