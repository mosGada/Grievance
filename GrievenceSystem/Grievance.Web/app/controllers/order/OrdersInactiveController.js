'use strict';
app.controller('OrdersInactiveController', ['$scope', '$filter', 'ordersService', 'authService', 'uiGridConstants', 'ngStatus', function ($scope, $filter, ordersService, authService, uiGridConstants, ngStatus) {
    $scope.userRole = authService.authentication.userRole;
    $scope.isLogistics = false;
    $scope.isTransport = false;
    $scope.isFleet = false;
    $scope.isAdmin = false;

    $scope.setAccess = function (userRole) {
        switch (userRole) {
            case 'Logistics Controller':
                $scope.isLogistics = true;
                break;
            case 'Transport Controller':
                $scope.isTransport = true;
                break;
            case 'Fleet Controller':
                $scope.isFleet = true;
                break;
            default:
                $scope.isAdmin = true;
                break;
        };
    };

  


  

    $scope.setAccess($scope.userRole);

    $scope.gridOptions = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.gridOptions = {        
        enableSorting: true,      
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Cancelled_Order_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Cancelled Orders", style: 'headerStyle',alignment: 'center'  },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'A4',
        exporterPdfMaxGridWidth: 650,
        exporterIsExcelCompatible: true,
        exporterSuppressColumns: 'Actions',
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterFieldCallback: function (grid, row, col, input) {
            if (col.name == 'createdDate') {
                return moment(input).format('YYYY/MM/DD');
            }
            else if (col.name == 'statusTime') {
                return moment(input).format('HH:MM');
            }
            else if (col.name == 'scheduleDeliveryDate') {
                return moment(input).format('YYYY/MM/DD');
            }
            else { return input; }



        },
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [
              {
                  name: 'createdDate',
                  field: 'createdDate',
                  displayName: 'Creation Date',
                  enableCellEdit: false,
                  type: 'date'
                  , cellFilter: 'date:\'yyyy/MM/dd\'',
                  enableFiltering: true, filter: {
                      term: $scope.filterOptions.filterText
                  }
              },
              { field: 'createdBy', displayName: 'Order Entered by', enableCellEdit: false },
              { field: 'customerName', displayName: 'Customer Name', enableCellEdit: false },
              { field: 'orderNumber', displayName: 'Order Number', enableCellEdit: false },
               {
                   field: 'companyName',
                   displayName: 'Company Name',
                   enableCellEdit: false,
               },
               { field: 'driverName', displayName: 'Driver', enableCellEdit: false },
              {
                  field: 'productDescription',
                  displayName: 'Product Description',
                  enableCellEdit: false
              },
              {

                  field: 'deliveryTypeDescription',
                  displayName: 'DeliveryType Description',
                  enableCellEdit: false,

              },
            { field: 'quantity', displayName: 'Quantity Planned', enableCellEdit: true, type: 'number' },
            {
                field: 'scheduleDeliveryDate', displayName: 'Schedule Delivery Date', enableCellEdit: false,
                type: 'date'
                , cellFilter: 'date:\'yyyy/MM/dd\''
            },
            {
                field: 'statusTime', displayName: 'Status Time', enableCellEdit: false
                , cellFilter: "date:'HH:mm'"
            },
            { field: 'reasonCodeDescription', displayName: 'Reason Code', enableCellEdit: false },
        ]
    };

    //$scope.getOrdersbyStatus = function (userRole) {
    //    switch (userRole) {
        
    //        default:
    //            ordersService.getInActiveOrders().then(function (response) {
    //                $scope.gridOptions.data = response.data;
    //                $scope.data = response.data;
    //            },
    //            function (error) {
    //                console.log('Error on Orders: ' + error.data.message);
    //            });

    //            break;
    //    };
    //};

    ordersService.getInActiveOrders().then(function (response) {
        $scope.gridOptions.data = response.data;
        $scope.data = response.data;
    },
function (error) {
    console.log('Error on Orders: ' + error.data.message);
});

    //$scope.getOrdersbyStatus($scope.userRole);

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.gridOptions.data = $scope.data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);

