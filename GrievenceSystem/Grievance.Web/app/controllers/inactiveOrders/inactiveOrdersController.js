'use strict';
app.controller('inactiveOrdersController', ['$scope', '$filter', 'ordersService', 'authService', 'uiGridConstants', 'ngStatus', function ($scope, $filter, ordersService, authService, uiGridConstants, ngStatus) {
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

    if (typeof $.connection.clientHub == 'undefined') {
        //on a Ctrl+F5 refresh on the Homescreen the signalr scripts aren't loaded by the time
        //we want to work with it's objects
        setTimeout(function () {
            registerInactiveHub();
        }, 3000);  //3000 = 3 seconds
    }
    else {
        registerInactiveHub();
    }

    
    function registerInactiveHub() {
        if (typeof $.connection.clientHub != 'undefined') {
            $.connection.hub.url = signalrBase;

            var hubInactive = $.connection.clientHub;
            $.connection.hub.logging = true;

            //one method needs to be declared before .start will take effect
            hubInactive.client.refreshscreen = function () {
                //console.log('refreshScreen hit');
                $scope.getInactiveOrders($scope.userRole);
            }

            hubInactive.client.joinhub = function (connectID, screenName) {
                //console.log(connectID + ' has joined the hub')
            }

            $.connection.hub.start();

            $.connection.hub.start().done(function () {
                //Join the Hub and tell it on which screen we are  console.log(".unload() called")
                hubInactive.server.joinhub('OrdersScreen', 'false');
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                hubInactive.server.leavehub('OrdersScreen');
            });
        }
    }

    $scope.setAccess($scope.userRole);

    $scope.gridOptions = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.gridOptions = {
        //enableSelectAll: true,
        enableSorting: true,
        //enableCellSelection: true,
        //enableRowSelection: true,
        //enableCellEditOnFocus: false,
        //editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Iactive_Order_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Orders", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'A3',
        exporterPdfMaxGridWidth: 800,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
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
                  ,cellFilter: 'date:\'yyyy/MM/dd\'',
                  enableFiltering: true, filter: {
                      term: $scope.filterOptions.filterText
                  }
              },
              { field: 'createdBy', displayName: 'Order Entered by', enableCellEdit: false },
              { field: 'customerName', displayName: 'Customer Name', enableCellEdit: false },
              { field: 'orderNumber', displayName: 'Order Number', enableCellEdit: false },
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

            { field: 'statusName', displayName: 'Status', enableCellEdit: false },
            {
                field: 'statusTime', displayName: 'Status Time', enableCellEdit: false
                , cellFilter: "date:'HH:MM'"
            },
            { field: 'reasonCodeDescription', displayName: 'Reason Code', enableCellEdit: false },
        ]
    };

    $scope.getInactiveOrders = function (userRole) {
        switch (userRole) {
            //case 'Logistics Controller':
            //    //break;
            //case 'Transport Controller':
            //    //break;
            //case 'Fleet Controller':
            //    //break;
            default:
                ordersService.getInactiveOrders().then(function (response) {
                    $scope.gridOptions.data = response.data;
                    $scope.data = response.data;
                },
                function (error) {
                    console.log('Error on Orders: ' + error.data.message);
                });

                break;
        };
    };

    $scope.getInactiveOrders($scope.userRole);

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.gridOptions.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);

