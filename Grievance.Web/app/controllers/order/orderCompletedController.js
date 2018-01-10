'use strict';
app.controller('orderCompletedController', ['$scope', '$filter', 'ordersService', 'authService', 'uiGridConstants', 'ngStatus', '$uibModal', function ($scope, $filter, ordersService, authService, uiGridConstants, ngStatus, $uibModal) {
    $scope.userRole = authService.authentication.userRole;
    $scope.isLogistics = false;
    $scope.isTransport = false;
    $scope.isFleet = false;
    $scope.isAdmin = false;


   //get the first date and last date of the current month
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        firstDay = moment(firstDay).format('MM/DD/YYYY');
        lastDay = moment(lastDay).format('MM/DD/YYYY');
    


    $scope.errorCount = 0;

    $scope.dateFilter = {
        dateReturn: '',
        dateFrom: '',
        dateTo: ''
    };
    $scope.noOrders = false;

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
        //enableSelectAll: true,
        enableSorting: true,
        //enableCellSelection: true,
        //enableRowSelection: true,
        //enableCellEditOnFocus: false,
        //editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Completed_Order_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Completed Orders", style: 'headerStyle', alignment: 'center' },
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
              { field: 'customerName', displayName: 'Customer Name', enableCellEdit: false, width: "11.5%" },
              { field: 'orderNumber', displayName: 'Order Number', enableCellEdit: false },
               {
                   field: 'companyName',
                   displayName: 'Company Name',
                   enableCellEdit: false,
               },
               { field: 'purchaseOrderNumber', displayName: 'Purchase Order Number', enableCellEdit: false },
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
            {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-show="row.entity.statusName == \'Completed\' || row.entity.statusName == \'In Progress\'" ng-click="grid.appScope.deliveryActionsStatus(row.entity)" class="btn btn-default" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Delivery Status Update">' +
                     ' <span class="fa fa-truck fa-lg" aria-hidden="true"></span>' +
                     '</button>' +
                     '<button type="button" ng-show="row.entity.statusName == \'Completed\'" ng-click="grid.appScope.deliveryNote(row.entity)" class="btn btn-default btnMarginLeft" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Delivery Note">' +
                     '<span class="fa fa-file fa-lg" aria-hidden="true"></span>' +
                     '</button>',
                enableCellEdit: false,
                enableFiltering: false,
                enableSorting: false,
                showSortMenu: false,
                enableColumnMenu: false,
                width: "9.5%"
            }
           
        ]
    };

    $scope.displayDate = 'date range ' + firstDay + ' to ' + lastDay;
    $scope.noOrders = false;
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
            //get data data based on the date range
            $scope.gridOptions.data ="";
            $scope.getOrdersbyStatus($scope.userRole);
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

    });

    $(function () {
        $scope.start = new Date();
        $scope.startMonth = $scope.start;
    });

    $scope.getOrdersbyStatus = function (userRole) {
        switch (userRole) {
        
            default:
                if ($scope.dateFilter.dateFrom == "") {
                    $scope.dateFilter.dateFrom = firstDay;
                    $scope.dateFilter.dateTo = lastDay;
                }
                ordersService.getOrdersbyStatus(ngStatus.completed,$scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
                    $scope.gridOptions.data = response.data;
                    $scope.Data = response.data;
                    $scope.dateFilter.dateFrom = "";
                    $scope.dateFilter.dateTo = "";
                    //check if data is avaiable
                    if (response.data.length == 0) {
                        $scope.noOrders = true;
                    }
                    else {
                        $scope.noOrders = false;
                    }
                 
                    },
                function (error) {
                    console.log('Error on Orders: ' + error.data.message);
                });

             
                break;
        };
    };
  
    $scope.restdatatocurrentmonth = function (userRole) {
        //reset data to current month
        $scope.getOrdersbyStatus($scope.userRole);
        $scope.dateFilter.dateReturn = null;
       //message to user if no data is available
        if ($scope.dateFilter.dateReturn == null) {
            $scope.displayDate = 'date range ' + firstDay +' to '+lastDay;
        }
    }

    $scope.getOrdersbyStatus($scope.userRole);

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

    ///Handles order delivery action statuses
    $scope.deliveryActionsStatus = function displayModal(data) {
        $scope.order = angular.copy(data);
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };

        modalScope.modalInstance = $uibModal.open({
            controller: 'orderDeliveryActionController',
            size: 'lg',
            templateUrl: '/app/views/order/deliveryActionsStatus.html',
            scope: modalScope
        });

    }

    //#region DeliveryNote
    $scope.deliveryNote = function (data) {
        ordersService.getDeliveryNote(data).then(function (response) {
            return response
        });
    };
    //#endregion DeliveryNote

}]);

