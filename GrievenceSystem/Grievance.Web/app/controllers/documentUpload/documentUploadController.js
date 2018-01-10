
app.controller('documentUploadController', ['$scope', 'documentUploadService', 'commercialSummaryService', function ($scope, documentUploadService, commercialSummaryService) {
    //Variable Declarations
    $scope.selectedFile = null;
    $scope.msg = "";
    $scope.gridOptions = {
        enableSorting: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'CommercialSummaryDashboard_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Commercial Summary Dashboard", style: 'headerStyle', alignment: 'center' },
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
              { field: 'dayOfDelivery', displayName: 'DAY OF DELIVERY', enableCellEdit: false, width: "9.5%" },
              { field: 'dateLoaded', displayName: 'Date Loaded', enableCellEdit: false, width: "9.5%", type: 'date', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'dateDelivered', displayName: 'Date Delivered', enableCellEdit: false, width: "9.5%", type: 'date', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'fleetNoTruck', displayName: 'Fleet No. Truck', enableCellEdit: false, width: "9.5%" },
              { field: 'variableType', displayName: 'Variable Type', enableCellEdit: false, width: "9.5%" },
              { field: 'contractType', displayName: 'Contract Type', enableCellEdit: false, width: "9.5%" },
              { field: 'materialNoOrdered', displayName: 'Material No. Ordered', enableCellEdit: false, width: "9.5%" },
              { field: 'customer', displayName: 'Customer', enableCellEdit: false, width: "9.5%" },
              { field: 'divertedTo', displayName: 'Diverted To', enableCellEdit: false, width: "9.5%" },
              { field: 'business', displayName: 'Business', enableCellEdit: false, width: "9.5%" },
              { field: 'driver', displayName: 'Driver', enableCellEdit: false, width: "9.5%" },
              { field: 'coDriver', displayName: 'Co-Driver', enableCellEdit: false, width: "9.5%" },
              { field: 'loadingReportNo', displayName: 'Loading Report No.', enableCellEdit: false, width: "9.5%" },
              { field: 'poNo', displayName: 'PO No.', enableCellEdit: false, width: "9.5%" },
              { field: 'weighBridgeTransactionNo', displayName: 'Weighbridge Transaction No.', enableCellEdit: false, width: "9.5%" },
              { field: 'matDocNo', displayName: 'MAT DOC No.', enableCellEdit: false, width: "9.5%" },
              { field: 'weightOrdered', displayName: 'Weight Ordered', enableCellEdit: false, width: "9.5%" },
              { field: 'firstWeight', displayName: 'First Weight', enableCellEdit: false, width: "9.5%" },
              { field: 'secondWeight', displayName: 'Second Weight', enableCellEdit: false, width: "9.5%" },
              { field: 'nettMassLoaded', displayName: 'Nett Mass Loaded', enableCellEdit: false, width: "9.5%" },
              { field: 'tonnageActuallyDelivered', displayName: 'Tonnage Actually Delivered', enableCellEdit: false, width: "9.5%" },
              { field: 'vehicleCapacity', displayName: 'Vehicle Capacity', enableCellEdit: false, width: "9.5%" },
              { field: 'depotName', displayName: 'Depot Name', enableCellEdit: false, width: "9.5%" },
              { field: 'departDepotOpening', displayName: 'Depart Depot Opening KM', enableCellEdit: false, width: "9.5%" },
              { field: 'depotLoadingStartTime', displayName: 'Depot Loading Start Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'depotLoadingFinishTime', displayName: 'Depot Loading Finish Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'aelMineArrivalTime', displayName: 'AEL Mine Arrival Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'aelMineDepatureTime', displayName: 'AEL Mine Departure Time', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'customerDepartureDate', displayName: 'Customer Departure Date', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'returnDepotClosing', displayName: 'Return Depot Closing KM', enableCellEdit: false, width: "9.5%" },
              { field: 'dateArrivalDepot', displayName: 'Date Arrival Depot', enableCellEdit: false, width: "9.5%", cellFilter: 'date:\'yyyy/MM/dd\'' },
              { field: 'totalTimeSpentOnAelMine', displayName: 'Total Time Spent On AEL Mine', enableCellEdit: false, width: "9.5%" },
              { field: 'sleepOvers', displayName: 'Sleepovers', enableCellEdit: false, width: "9.5%" },
              { field: 'diverts', displayName: 'Diverts', enableCellEdit: false, width: "9.5%" },
              { field: 'comments', displayName: 'Comments ', enableCellEdit: false, width: "9.5%" },
              { field: 'nt', displayName: 'NT', enableCellEdit: false, width: "9.5%" },
              { field: 'drivers', displayName: 'Drivers', enableCellEdit: false, width: "9.5%" },
              { field: 'ot', displayName: 'OT', enableCellEdit: false, width: "9.5%" },
              { field: 'dt', displayName: 'D/T', enableCellEdit: false, width: "9.5%" },
              { field: 'originDepotPlant', displayName: 'Origin (Depot/Plant)', enableCellEdit: false, width: "9.5%" },
              { field: 'destinationArea', displayName: 'Destination (Area)', enableCellEdit: false, width: "9.5%" },
              { field: 'returnTripDistance', displayName: 'Return Trip Distance (km)', enableCellEdit: false, width: "9.5%" },
              { field: 'returnTons', displayName: 'Return Tons', enableCellEdit: false, width: "9.5%" },
              { field: 'commentsReason', displayName: 'Comments/Reason', enableCellEdit: false, width: "9.5%" },
              { field: 'eToll', displayName: 'E-Toll', enableCellEdit: false, width: "9.5%" },
              { field: 'tollFeesExclVat', displayName: 'Toll Fees Excl VAT', enableCellEdit: false, width: "9.5%" },
              { field: 'otHrsStd', displayName: 'O/T hrs Std ( x 1.5)', enableCellEdit: false, width: "9.5%" },
              { field: 'otHrsDbl', displayName: 'O/T hrs double ( x 2) ', enableCellEdit: false, width: "9.5%" },
              { field: 'hourlyRate', displayName: 'Hourly Rate', enableCellEdit: false, width: "9.5%" },
              { field: 'totalOtCharge', displayName: 'Total O/T charge', enableCellEdit: false, width: "9.5%" },
              { field: 'variableRate', displayName: 'Variable Rate', enableCellEdit: false, width: "9.5%" },
              { field: 'columnNotApplicable', displayName: 'Column Not Applicable', enableCellEdit: false, width: "9.5%" },
              { field: 'variableCost', displayName: 'Variable Cost', enableCellEdit: false, width: "9.5%" },
              { field: 'totalCost', displayName: 'Total Cost', enableCellEdit: false, width: "9.5%" },
              { field: 'product', displayName: 'Product', enableCellEdit: false, width: "9.5%" },
              { field: 'transporter', displayName: 'Transporter', enableCellEdit: false, width: "9.5%" },
              { field: 'trips', displayName: 'Trips', enableCellEdit: false, width: "9.5%" }
            ]
    };
    var X = XLSX;

    $scope.dashOptions = {
        enableSorting: true,
        enableGridMenu: true,
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'CommercialSummary_Dashboard_Export_' + new Date() + '.csv',
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
            if (col.name == 'createdDate') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'scheduleDeliveryDate') {
                return moment(input).format('YYYY/MM/DD');

            }
            else { return input; }
        },
        columnDefs: [
            {
                field: 'transporter', displayName: 'Transporter', enableCellEdit: false,
                grouping: { groupPriority: 0, width: "5%" }
            },
            {
                field: 'product', displayName: 'Product', enableCellEdit: false, grouping: { groupPriority: 1 }
            },
            {
                field: 'sum_of_Total_Cost', displayName: 'Sum Of Total Cost', enableCellEdit: false
            },
            {
                field: 'sum_of_TONNAGE_ACTUALLY_DELIVERED', displayName: 'Sum Of Tonnage Acually Delivered', enableCellEdit: false
            },
            {
                field: 'sum_of_DIVERTS', displayName: 'Sum Of Diverts', enableCellEdit: false
            },
            {
                field: 'sum_of_SLEEPOVERS', displayName: 'Sum Of Sleep Overs', enableCellEdit: false
            },
            {
                field: 'sum_of_Return_Trip_Distance__km_', displayName: 'Sum Of Return Trip Distance (KM)', enableCellEdit: false
            }
        ]
    };

    //#region DatePicker
    $scope.dateFilter = {
        dateReturn: '',
        dateFrom: '',
        dateTo: ''
    };

    $(function () {
        $('input[name="datefilter"]').daterangepicker({
            "linkedCalendars": false,
            autoUpdateInput: false,
            format: 'dd/mm/yyyy',
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            $scope.dateFilter.dateFrom = picker.startDate.format('MM/DD/YYYY');
            $scope.dateFilter.dateTo = picker.endDate.format('MM/DD/YYYY');
            $scope.dateFilter.dateReturn = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY');
            $scope.displayDate = 'date range selected ' + $scope.dateFilter.dateReturn;
            $scope.getDashboardByDateFilter();
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });
    });

    $(function () {
        $scope.start = new Date();
        $scope.startMonth = $scope.start;
    });

    //Get dashboard by date filter
    $scope.getDashboardByDateFilter = function ()
    {
        alert("Get invoked");
        documentUploadService.getAllByDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
            $scope.gridOptions.data = response.data;
        });

        documentUploadService.getDashboardByDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
            $scope.dashOptions.data = response.data;
        });
    };
    //#endregion DatePicker

    $scope.loadFile = function (files) {
        $scope.$apply(function () {
            $scope.selectedFile = files[0];
        });
    }

    //#region Helper_methods
    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    };

    function to_json(workbook) {
        var first_sheet_name = workbook.SheetNames[0];
        var result = X.utils.sheet_to_row_object_array(workbook.Sheets[first_sheet_name]);

        return result;
    };

    function process_wb(wb) {
        global_wb = wb;
        var output = "";

        output = JSON.stringify(to_json(wb), 2, 2);

            if (output.length > 0) {
                $scope.save(output);
            } else {
                $scope.msg = "Error processing file.";
            }
    };
    //#endregion Helper_methods

    //#region Get_GridData
    $scope.GetGridData = function () {
        documentUploadService.getAll().then(function (response) {
            $scope.gridOptions.data = response.data;
        });

        documentUploadService.getDashboard().then(function (response) {
            $scope.dashOptions.data = response.data;
        });
    };
    //#endregion Get_GridData

    $scope.handleFile = function () {
        var file = $scope.selectedFile;
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = e.target.result;
                var workbook;
                var arr = fixdata(data);
                workbook = X.read(btoa(arr), { type: 'base64' });
                process_wb(workbook);
            };

            reader.onerror = function (ex) {
                $scope.msg = "Error processing file.";
                //$scope.msg = ex.message;
            };

            reader.readAsArrayBuffer(file);
        }
    };

    
    $scope.save = function (data) {
        documentUploadService.uploadDocument(data).then(function (response) {
            $scope.msg = response.data;
            //Clear grid data
            $scope.gridOptions.data = [];
            $scope.dashOptions.data = [];

            //Get grid data
            $scope.GetGridData();
        });
    };

    //Initial Data fetch
    $scope.GetGridData();


}]);