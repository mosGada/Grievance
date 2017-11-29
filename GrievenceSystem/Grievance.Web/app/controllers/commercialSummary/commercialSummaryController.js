
app.controller('commercialSummaryController', ['$scope', 'commercialSummaryService', function ($scope, commercialSummaryService) {
    $scope.gridOptions = {
        enableSorting: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'CommercialSummary_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Commercial Summary", style: 'headerStyle', alignment: 'center' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, alignment: 'center' };
            return docDefinition;
        },
        exporterPdfPageSize: 'A4',
        exporterPdfOrientation: 'landscape',
        exporterPdfMaxGridWidth: 630,
        exporterIsExcelCompatible: true,
        exporterSuppressColumns: 'Actions',
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterFieldCallback: function (grid, row, col, input) {
            if (col.name == 'dateLoaded') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'dateDelivered') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'aelDepotLoadingStartTime') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'aelDepotLoadingFinishTime') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'aelMineArrivalTime') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'aelMineDepartureTime') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'customerDepartureDate') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'dateArrivalDepot') {
                return moment(input).format('YYYY/MM/DD');
            }
            else { return input; }
        },
        columnDefs:
            [
              { field: 'month', displayName: 'Month', type: 'date', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true, width: "9.5%" },
              { field: 'dayOfDelivery', displayName: 'DAY OF DELIVERY', enableCellEdit: false, width: "9.5%" },
              { field: 'dateLoaded', displayName: 'Date Loaded', enableCellEdit: false, width: "9.5%", type: 'date', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'dateDelivered', displayName: 'Date Delivered', enableCellEdit: false, width: "9.5%", type: 'date', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'registrationNumber', displayName: 'Fleet No. Truck', enableCellEdit: false, width: "9.5%" },
              { field: 'variableType', displayName: 'Variable Type', enableCellEdit: false, width: "9.5%" },
              { field: 'contractType', displayName: 'Contract Type', enableCellEdit: false, width: "9.5%" },
              { field: 'materialNoOrdered', displayName: 'Material No. Ordered', enableCellEdit: false, width: "9.5%" },
              { field: 'customer', displayName: 'Customer', enableCellEdit: false, width: "9.5%" },
              { field: 'latitude', displayName: 'Latitude', enableCellEdit: false, width: "9.5%" },
              { field: 'longitude', displayName: 'Longitude', enableCellEdit: false, width: "9.5%" },
              { field: 'deliveredTo', displayName: 'Diverted To', enableCellEdit: false, width: "9.5%" },
              { field: 'business', displayName: 'Business', enableCellEdit: false, width: "9.5%" },
              { field: 'driver', displayName: 'Driver', enableCellEdit: false, width: "9.5%" },
              { field: 'loadingReportNo', displayName: 'Loading Report No.', enableCellEdit: false, width: "9.5%" },
              { field: 'poNo', displayName: 'PO No.', enableCellEdit: false, width: "9.5%" },
              { field: 'weighBridgeTransactionNo', displayName: 'Weighbridge Transaction No.', enableCellEdit: false, width: "9.5%" },
              { field: 'matDocNo', displayName: 'MAT DOC No.', enableCellEdit: false, width: "9.5%" },
              { field: 'weightOrdered', displayName: 'Weight Ordered', enableCellEdit: false, width: "9.5%" },
              { field: 'firstWeight', displayName: 'First Weight', enableCellEdit: false, width: "9.5%" },
              { field: 'secondWeight', displayName: 'Second Weight', enableCellEdit: false, width: "9.5%" },
              { field: 'nettMassLoaded', displayName: 'Nett Mass Loaded', enableCellEdit: false, width: "9.5%" },
              { field: 'tonnageActuallyDelivered', displayName: 'Tonnage Actually Delivered', enableCellEdit: false, width: "9.5%" },
              { field: 'capacity', displayName: 'Vehicle Capacity', enableCellEdit: false, width: "9.5%" },
              { field: 'depotName', displayName: 'Depot Name', enableCellEdit: false, width: "9.5%" },
              { field: 'departDepotOpening', displayName: 'Depart Depot Opening KM', enableCellEdit: false, width: "9.5%" },
              { field: 'aelDepotLoadingStartTime', displayName: 'AEL Depot Loading Start Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'aelDepotLoadingFinishTime', displayName: 'AEL Depot Loading Finish Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'aelMineArrivalTime', displayName: 'AEL Mine Arrival Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'aelMineDepartureTime', displayName: 'AEL Mine Departure Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'customerDepartureDate', displayName: 'Customer Departure Date', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'returnDepotClosing', displayName: 'Return Depot Closing KM', enableCellEdit: false, width: "9.5%" },
              { field: 'dateArrivalDepot', displayName: 'Date Arrival Depot', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'totalTimeSpentOnAelMine', displayName: 'Total Time Spent On AEL Mine', enableCellEdit: false, width: "9.5%" },
              { field: 'sleepOvers', displayName: 'Sleepovers', enableCellEdit: false, width: "9.5%" },
              { field: 'diverts', displayName: 'Diverts', enableCellEdit: false, width: "9.5%" },
              { field: 'comments', displayName: 'Comments ', enableCellEdit: false, width: "9.5%" },
              { field: 'returnTripDistance', displayName: 'Return Trip Distance (km)', enableCellEdit: false, width: "9.5%" },
              { field: 'returnTons', displayName: 'Return Tons', enableCellEdit: false, width: "9.5%" },
              { field: 'commentsReason', displayName: 'Comments/Reason', enableCellEdit: false, width: "9.5%" },
              { field: 'eToll', displayName: 'E-Toll', enableCellEdit: false, width: "9.5%" },
              { field: 'tollFeesExclVat', displayName: 'Toll Fees Excl VAT', enableCellEdit: false, width: "9.5%" },
              { field: 'variableRate', displayName: 'Variable Rate', enableCellEdit: false, width: "9.5%" },
              { field: 'variableCost', displayName: 'Variable Cost', enableCellEdit: false, width: "9.5%" },
              { field: 'totalCost', displayName: 'Total Cost', enableCellEdit: false, width: "9.5%" },
              { field: 'product', displayName: 'Product', enableCellEdit: false, width: "9.5%" },
              { field: 'transporter', displayName: 'Transporter', enableCellEdit: false, width: "9.5%" }

        ]
    };

    commercialSummaryService.getAll().then(function(response) {
        $scope.gridOptions.data = response.data;
    });
}]);

