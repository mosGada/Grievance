
app.controller('taskDurationController', ['$scope', 'taskDurationService',  function ($scope, taskDurationService) {
   
    
    $scope.gridOptions = {
        enableSorting: true,
        enableGridMenu: true,
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'TaskDuration_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Task Duration", style: 'headerStyle', alignment: 'center' },
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
            if (col.name == 'createdDate') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'scheduleDeliveryDate')
            {
                return moment(input).format('YYYY/MM/DD');

            }
            else { return input; }
        },
        columnDefs: [
            { field: 'createdDate', displayName: 'Creation Date', type: 'date', cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true, width: "8.5%" },
            { field: 'customerName', displayName: 'Customer Name', enableCellEdit: false, width: "10.5%" },
            { field: 'productDescription', displayName: 'Product', enableCellEdit: false, width: "6.5%" },
            { field: 'deliveryTypeDescription', displayName: 'Delivery Type', enableCellEdit: false, width: "6.5%" },
            { field: 'quantity', displayName: 'Quantity Planned', enableCellEdit: true, type: 'number', width: "6.5%" },
            { field: 'scheduleDeliveryDate', displayName: 'Schedule Delivery Date', enableCellEdit: false, type: 'date', cellFilter: 'date:\'yyyy/MM/dd\'', width: "6.5%" },
            { field: 'transporter', displayName: 'Transporter', enableCellEdit: false, width: "6.5%" },
            { field: 'purchaseOrderNumber', displayName: 'Purchase Order Number', enableCellEdit: false, width: "6.5%" },
            { field: 'driverName', displayName: 'Driver', enableCellEdit: false, width: "6.5%" },
            { field: 'authorized', displayName: 'Authorized', enableCellEdit: false, width: "6.5%" },
            { field: 'assigned', displayName: 'Assigned', enableCellEdit: false, width: "6.5%" },
            { field: 'identifyVehicleAndDriver', displayName: 'Identify Vehicle And Driver', enableCellEdit: false, width: "6.5%" },
            { field: 'vehicleInspection', displayName: 'Vehicle Inspection', enableCellEdit: false, width: "6.5%" },
            { field: 'loading', displayName: 'Loading', enableCellEdit: false, width: "6.5%" },
            { field: 'departOdometer', displayName: 'Depart Odometer', enableCellEdit: false, width: "6.5%" },
            //{ field: 'customerDetails', displayName: 'Customer Details', enableCellEdit: false, width: "6.5%" },
            { field: 'customerDetails', displayName: 'On Route', enableCellEdit: false, width: "6.5%" },
            //{ field: 'arriveOdometer', displayName: 'Arrive Odometer', enableCellEdit: false, width: "6.5%" },
            { field: 'arriveOdometer', displayName: 'Arrive At Mine', enableCellEdit: false, width: "6.5%" },
            { field: 'delivery', displayName: 'Delivery', enableCellEdit: false, width: "6.5%" },
            { field: 'returning', displayName: 'Returning', enableCellEdit: false, width: "6.5%" },
            { field: 'endOdometer', displayName: 'End Odometer', enableCellEdit: false, width: "6.5%" },
        ]
    };

    taskDurationService.getAll().then(function (response) {
        $scope.gridOptions.data = response.data;
    });

    $scope.time = { minutes: 150 };
}]);