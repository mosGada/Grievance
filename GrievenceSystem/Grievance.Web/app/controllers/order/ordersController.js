'use strict';
app.controller('ordersController', ['$rootScope', '$scope', '$filter', 'ordersService', 'tankerService', 'deliveryTypeService', 'productService', 'customerService', 'companyService', 'authService', 'uiGridConstants', '$uibModal', 'ngStatus', 'orderStream', 'ngRoles', 'signalR', 'ngResponse', function ($rootScope, $scope, $filter, ordersService, tankerService, deliveryTypeService, productService, customerService, companyService, authService, uiGridConstants, $uibModal, ngStatus, orderStream, ngRoles, signalR, ngResponse) {
    //User Authentication Data
    $scope.authentication = authService.authentication;
    $scope.userRole = $scope.authentication.userRole;
    $scope.userName = $scope.authentication.userName;
    $scope.userCompany = $scope.authentication.userCompany;

    $scope.errorCount = 0;

    $scope.dateFilter = {
        dateReturn: '',
        dateFrom: '',
        dateTo: ''
    };

    $scope.dateF = {};

    $scope.roles = '';
    if ($scope.userRole === 'Administrator') {
        $scope.roles = 'Administrator'
    } else
        if ($scope.userRole === 'Fleet Controller') {
            $scope.roles = 'FleetController'
        }
        else {
            $scope.roles = 'LogisticsController'
        }

    //App Role Constants
    $scope.ngRoles = ngRoles;

    ///Order Stream Update
    orderStream.on('orderUpdate', function (order) {
        var index = $scope.getGridRowIndex(order.id);
        if (index != -1) {
            //Update Grid Order
            $scope.gridOptions.data[index] = order;

            //Update Data Order 
            $scope.Data[index] = order;
        }
    });

    ///Order Stream Delete
    orderStream.on('orderDelete', function (order) {
        var index = $scope.getGridRowIndex(order.id);
        if (index != -1) {
            //Remove order from grid
            $scope.gridOptions.data.splice(index, 1);

            //Remove order from Data
            $scope.Data.splice(index, 1);
        }
    });

    ///Order Stream Add
    orderStream.on('orderAdd', function (order) {
        var index = $scope.getGridRowIndex(order.id);
        if (index == -1) {
            switch ($scope.userRole) {
                case $scope.ngRoles.logistics: ///Check if order belongs to User - Unlikely as user would have added the order him/herself
                    if (order.createdBy == $scope.userName) {
                        $scope.gridOptions.data.splice(0, 0, {
                            createdDate: order.createdDate,
                            createdBy: order.createdBy,
                            customerName: order.customerName,
                            customerId: order.customerId,
                            orderNumber: order.orderNumber,
                            productDescription: order.productDescription,
                            productId: order.productId,
                            deliveryTypeDescription: order.deliveryTypeDescription,
                            deliveryTypeId: order.deliveryTypeId,
                            quantity: order.quantity,
                            scheduleDeliveryDate: order.scheduleDeliveryDate,
                            companyName: order.companyName,
                            companyId: order.companyId,
                            purchaseOrderNumber: order.purchaseOrderNumber,
                            driverName: order.driverName,
                            driverId: order.driverId,
                            assignedBy: order.assignedBy,
                            assignedDate: order.assignedDate,
                            authorizedBy: order.authorizedBy,
                            authorizedDate: order.authorizedDate,
                            updatedBy: order.updatedBy,
                            updatedDate: order.updatedDate,
                            statusName: order.statusName,
                            statusTime: order.statusTime,
                            statusId: order.statusId,
                            id: order.id
                        });
                    }
                    break;
                case $scope.ngRoles.transport: // Transport Controller Role - May See All Orders  
                    $scope.gridOptions.data.splice(0, 0, {
                        createdDate: order.createdDate,
                        createdBy: order.createdBy,
                        customerName: order.customerName,
                        customerId: order.customerId,
                        orderNumber: order.orderNumber,
                        productDescription: order.productDescription,
                        productId: order.productId,
                        deliveryTypeDescription: order.deliveryTypeDescription,
                        deliveryTypeId: order.deliveryTypeId,
                        quantity: order.quantity,
                        scheduleDeliveryDate: order.scheduleDeliveryDate,
                        companyName: order.companyName,
                        companyId: order.companyId,
                        purchaseOrderNumber: order.purchaseOrderNumber,
                        driverName: order.driverName,
                        driverId: order.driverId,
                        assignedBy: order.assignedBy,
                        assignedDate: order.assignedDate,
                        authorizedBy: order.authorizedBy,
                        authorizedDate: order.authorizedDate,
                        updatedBy: order.updatedBy,
                        updatedDate: order.updatedDate,
                        statusName: order.statusName,
                        statusTime: order.statusTime,
                        statusId: order.statusId,
                        id: order.id
                    });
                    break;
                case $scope.ngRoles.fleet: ///Check if Assigned to Fleet Controller Company
                    if (order.companyName === $scope.userCompany) {
                        $scope.gridOptions.data.splice(0, 0, {
                            createdDate: order.createdDate,
                            createdBy: order.createdBy,
                            customerName: order.customerName,
                            customerId: order.customerId,
                            orderNumber: order.orderNumber,
                            productDescription: order.productDescription,
                            productId: order.productId,
                            deliveryTypeDescription: order.deliveryTypeDescription,
                            deliveryTypeId: order.deliveryTypeId,
                            quantity: order.quantity,
                            scheduleDeliveryDate: order.scheduleDeliveryDate,
                            companyName: order.companyName,
                            companyId: order.companyId,
                            purchaseOrderNumber: order.purchaseOrderNumber,
                            driverName: order.driverName,
                            driverId: order.driverId,
                            assignedBy: order.assignedBy,
                            assignedDate: order.assignedDate,
                            authorizedBy: order.authorizedBy,
                            authorizedDate: order.authorizedDate,
                            updatedBy: order.updatedBy,
                            updatedDate: order.updatedDate,
                            statusName: order.statusName,
                            statusTime: order.statusTime,
                            statusId: order.statusId,
                            id: order.id
                        });
                    };
                    break;
                default: //Administrator Role - May See All orders
                    $scope.gridOptions.data.splice(0, 0, {
                        createdDate: order.createdDate,
                        createdBy: order.createdBy,
                        customerName: order.customerName,
                        customerId: order.customerId,
                        orderNumber: order.orderNumber,
                        productDescription: order.productDescription,
                        productId: order.productId,
                        deliveryTypeDescription: order.deliveryTypeDescription,
                        deliveryTypeId: order.deliveryTypeId,
                        quantity: order.quantity,
                        scheduleDeliveryDate: order.scheduleDeliveryDate,
                        companyName: order.companyName,
                        companyId: order.companyId,
                        purchaseOrderNumber: order.purchaseOrderNumber,
                        driverName: order.driverName,
                        driverId: order.driverId,
                        assignedBy: order.assignedBy,
                        assignedDate: order.assignedDate,
                        authorizedBy: order.authorizedBy,
                        authorizedDate: order.authorizedDate,
                        updatedBy: order.updatedBy,
                        updatedDate: order.updatedDate,
                        statusName: order.statusName,
                        statusTime: order.statusTime,
                        statusId: order.statusId,
                        id: order.id
                    });
                    break;
            };
        }

    });

    ///Helper method to return array index of order
    $scope.getGridRowIndex = function (id) {
        var k = -1;
        for (var i = 0; i < $scope.gridOptions.data.length; i++) {
            if ($scope.gridOptions.data[i].id == id) {
                k = i;
                break;
            }
        };
        return k;
    };


    $scope.isLogistics = false;
    $scope.isTransport = false;
    $scope.isFleet = false;
    $scope.isAdmin = false;

    $scope.tankers = [];

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
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Order_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 8 },
        exporterPdfTableStyle: { margin: [0, 0, 0, 0] },
        exporterPdfTableHeaderStyle: { fontSize: 8, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Orders", style: 'headerStyle', alignment: 'center' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, alignment: 'center' };
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
                name: 'createdDate', field: 'createdDate', displayName: 'Creation Date', enableCellEdit: false, type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'', enableFiltering: true,
                filter: {
                    term: $scope.filterOptions.filterText
                }
            },
            { field: 'createdBy', displayName: 'Order Entered by', enableCellEdit: false },
            { field: 'customerName', displayName: 'Customer Name', enableCellEdit: false, width: "15.5%" },
            { field: 'orderNumber', displayName: 'Order Number', enableCellEdit: false },
            {
                field: 'productDescription',
                displayName: 'Product Description',
                enableCellEdit: false
            },
            { field: 'quantity', displayName: 'Quantity Planned', enableCellEdit: false, type: 'number' },
            { field: 'scheduleDeliveryDate', displayName: 'Schedule Delivery Date', enableCellEdit: false, type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
            {
                field: 'companyName',
                displayName: 'Company Name',
                enableCellEdit: false,
            },
            { field: 'purchaseOrderNumber', displayName: 'Purchase Order Number', enableCellEdit: false },
            { field: 'authorizedBy', displayName: 'Order Authorised By', enableCellEdit: false },
            { field: 'driverName', displayName: 'Driver', enableCellEdit: false },
            { field: 'assignedBy', displayName: 'Driver Assigned By', enableCellEdit: false },
                  {
                      field: 'statusName', displayName: 'Status', width: "7.5%", enableCellEdit: false,
                      cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                          if (grid.getCellValue(row, col) == ngStatus.assigned) {
                              return 'text-assigned';
                          }
                          else
                              if (grid.getCellValue(row, col) === ngStatus.authorized) {
                                  return 'text-authorized';
                              }
                              else
                                  if (grid.getCellValue(row, col) === ngStatus.pending) {
                                      return 'text-pending';
                                  }
                                  else
                                      if (grid.getCellValue(row, col) === ngStatus.completed) {
                                          return 'text-completed';
                                      }
                                      else
                                          if (grid.getCellValue(row, col) === ngStatus.inProgress) {
                                              return 'text-inProgress';
                                          }
                      }
                  },
            { field: 'statusTime', displayName: 'Status Time', enableCellEdit: false, width: "7.5%", cellFilter: "date:'HH:mm'" },
            {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-hide="row.entity.assignedBy != null" ng-click="grid.appScope.editOrder(row.entity)" class="btn btn-default" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Edit" >' +
                     ' <span class="fa fa-edit fa-lg" aria-hidden="true"></span>' +
                     '</button>' +
                      '<button type="button" ng-hide="row.entity.assignedBy != null" ng-click="grid.appScope.deleteOrder(row.entity, \'Delete\')" class="btn btn-default btnMarginLeft" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Remove">' +
                     ' <span class="fa fa-window-close fa-lg" aria-hidden="true"></span>' +
                     '</button>' +
                    '<button type="button" ng-show="row.entity.statusName == \'Completed\' || row.entity.statusName == \'In Progress\'" ng-click="grid.appScope.deliveryActionsStatus(row.entity)" class="btn btn-default" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Delivery Status Update">' +
                     ' <span class="fa fa-truck fa-lg" aria-hidden="true"></span>' +
                     '</button>' +
                    '<button type="button" ng-show="row.entity.statusName == \'Assigned\' && row.entity.externalId == \'Error\'"" class="btn btn-default" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Error trying to dispatch">' +
                     ' <span class="fa fa-exclamation-circle fa-lg" aria-hidden="true"></span>' +
                    '</button>' +
                     '<button type="button" ng-show="row.entity.statusName == \'Assigned\' && row.entity.externalId != \'Error\'"" class="btn btn-default" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Dispatched">' +
                     ' <span class="fa fa-check-circle fa-lg" aria-hidden="true"></span>' +
                     '<button type="button" ng-show="(grid.appScope.roles == \'Administrator\' || grid.appScope.roles == \'FleetController\') && (row.entity.statusName == \'Assigned\' || row.entity.statusName == \'In Progress\') && row.entity.externalId != \'Error\'" ng-click="grid.appScope.deleteOrder(row.entity,\'Cancel\')" class="btn btn-default btnMarginLeft colorRed" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Cancel">' +
                     ' <span class="fa fa-window-close fa-lg" aria-hidden="true"></span>',
                enableCellEdit: false,
                enableFiltering: false,
                enableSorting: false,
                showSortMenu: false,
                enableColumnMenu: false,
                width: "11.5%"
            }
        ]
    };

    $scope.displayDate = new Date();
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
            $scope.getOrdersByDateFilter();
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

    });

    $(function () {
        $scope.start = new Date();
        $scope.startMonth = $scope.start;
    });

    $scope.sendAssignedOrder = function (id) {
        ordersService.sendOrder(id).then(function (response) {
            //$scope.gridOptions.data[index] = response.data;
        },
        function (error) {
            //console.log(error.data.message);
        });
    };

    $scope.resendOrders = function () {
        ordersService.resendOrders().then(function (response) {
            ///update errorCount
            $scope.errorCount = $scope.Data.reduce(function (n, val) {
                return n + (val.externalId === 'Error');
            }, 0);
        });
    }

    $scope.getOrdersByDateFilter = function () {

        switch ($scope.userRole) {
            case $scope.ngRoles.admin:
                ordersService.getOrdersByDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
                    $scope.gridOptions.data = response.data;
                    $scope.Data = response.data;
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
            case $scope.ngRoles.logistics:
                ordersService.getOrdersByUserAndDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
                    $scope.gridOptions.data = response.data;
                    $scope.Data = response.data;
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
            case $scope.ngRoles.transport:
                ordersService.getOrdersByTransporterAndDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
                    $scope.gridOptions.data = response.data;
                    $scope.Data = response.data;
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
            case $scope.ngRoles.fleet:
                ordersService.getOrdersByTransporterAndDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
                    $scope.gridOptions.data = response.data;
                    $scope.Data = response.data;
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
        }

    }


    //Resert button points getUserOrders 
    $scope.getUserOrders = function (userRole) {

        switch ($scope.userRole) {
            case $scope.ngRoles.logistics:
                ordersService.getOrdersByUser().then(function (response) {
                    if (response.data.length == 0) {
                        $scope.noOrders = true;
                    } else {
                        $scope.gridOptions.data = response.data;
                        $scope.Data = response.data;
                        $scope.noOrders = false;
                        $scope.dateFilter.dateReturn = null;
                        $scope.errorCount = $scope.Data.reduce(function (n, val) {
                            return n + (val.externalId === 'Error');
                        }, 0);
                        if ($scope.dateFilter.dateReturn == null) {
                            $scope.displayDate = new Date();
                        }
                    }
                },
                function (error) {
                    console.log('Error on Orders: ' + error.data.message);
                });
                break;
            case $scope.ngRoles.transport:
                ordersService.getOrders().then(function (response) {
                    if (response.data.length == 0) {
                        $scope.noOrders = true;
                    } else {
                        $scope.gridOptions.data = response.data;
                        $scope.Data = response.data;
                        $scope.noOrders = false;
                        $scope.dateFilter.dateReturn = null;
                        $scope.errorCount = $scope.Data.reduce(function (n, val) {
                            return n + (val.externalId === 'Error');
                        }, 0);
                        if ($scope.dateFilter.dateReturn == null) {
                            $scope.displayDate = new Date();
                        }
                    }
                },
                function (error) {
                    console.log('Error on Orders: ' + error.data.message);
                });

                //Get Fleet Tankers
                tankerService.getAll().then(function (response) {
                    $scope.tankers = response.data;
                });
                break;
            case $scope.ngRoles.fleet:
                ordersService.getOrdersByTransporter().then(function (response) {
                    if (response.data.length == 0) {
                        $scope.noOrders = true;
                    } else {
                        $scope.gridOptions.data = response.data;
                        $scope.Data = response.data;
                        $scope.noOrders = false;
                        $scope.dateFilter.dateReturn = null;
                        $scope.errorCount = $scope.Data.reduce(function (n, val) {
                            return n + (val.externalId === 'Error');
                        }, 0);
                        if ($scope.dateFilter.dateReturn == null) {
                            $scope.displayDate = new Date();
                        }
                    }
                },
                function (error) {
                    console.log('Error on Orders: ' + error.data.message);
                });

                // Get Fleet Tankers
                tankerService.getByTransporter().then(function (response) {
                    $scope.tankers = response.data;
                });
                break;
            case $scope.ngRoles.admin:
                ordersService.getOrders().then(function (response) {
                    if (response.data.length == 0) {
                        $scope.noOrders = true;
                    } else {
                        $scope.gridOptions.data = response.data;
                        $scope.Data = response.data;
                        $scope.noOrders = false;
                        $scope.dateFilter.dateReturn = null;
                        $scope.errorCount = $scope.Data.reduce(function (n, val) {
                            return n + (val.externalId === 'Error');
                        }, 0);
                        if ($scope.dateFilter.dateReturn == null) {
                            $scope.displayDate = new Date();
                        }
                    }
                },
            function (error) {
                console.log('Error on Orders: ' + error.data.message);
            });

                //Get Fleet Tankers
                tankerService.getAll().then(function (response) {
                    $scope.tankers = response.data;
                });
                break;
        };

    };

    $scope.getUserOrders($scope.userRole);


    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    $scope.deleteSelected = function () {
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
            $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
        });
    };

    //Desc:     Function to add new order to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        var newDate = new Date();
        var defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 1);
        var scheduleDate = moment(defaultDate).format("DD/MM/YYYY");

        modalScope.order = {
            Id: 0,
            CustomerId: '',
            OrderNumber: '',
            ProductId: '',
            DeliveryTypeId: '',
            Quantity: '',
            ScheduleDeliveryDate: scheduleDate,
            CompanyId: '',
            PurchaseOrderNumber: '',
            AuthorizedBy: '',
            AuthorizedDate: '',
            AssignedBy: '',
            AssignedDate: '',
            StatusId: '',
            StatusTime: '',
            ReasonCodeId: '',
            CreatedDate: '',
            CreatedBy: '',
            UpdatedBy: '',
            UpdatedDate: '',
            DriverId: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };

        modalScope.saveOrder = function () {
            //Convert to API format
            var dateMoment = moment(modalScope.order.ScheduleDeliveryDate, 'DD/MM/YYYY')
            modalScope.order.ScheduleDeliveryDate = dateMoment.format("MM/DD/YYYY");

            ordersService.addOrder(modalScope.order).then(function (response) {
                //$scope.gridOptions.data.splice(0, 0, {
                //    createdDate: response.data.createdDate,
                //    createdBy: response.data.createdBy,
                //    customerName: response.data.customerName,
                //    customerId: response.data.customerId,
                //    orderNumber: response.data.orderNumber,
                //    productDescription: response.data.productDescription,
                //    productId: response.data.productId,
                //    deliveryTypeDescription: response.data.deliveryTypeDescription,
                //    deliveryTypeId: response.data.deliveryTypeId,
                //    quantity: response.data.quantity,
                //    scheduleDeliveryDate: response.data.scheduleDeliveryDate,
                //    companyName: response.data.companyName,
                //    companyId: response.data.companyId,
                //    purchaseOrderNumber: response.data.purchaseOrderNumber,
                //    driverName: response.data.driverName,
                //    driverId: response.data.driverId,
                //    assignedBy: response.data.assignedBy,
                //    assignedDate: response.data.assignedDate,
                //    authorizedBy: response.data.authorizedBy,
                //    authorizedDate: response.data.authorizedDate,
                //    updatedBy: response.data.updatedBy,
                //    updatedDate: response.data.updatedDate,
                //    statusName: response.data.statusName,
                //    statusTime: response.data.statusTime,
                //    statusId: response.data.statusId,
                //    id: response.data.id
                //});

                if (response.data.statusName === ngStatus.assigned) {
                    // Send Order to Open Item 3
                    $scope.sendAssignedOrder(response.data.id);
                }

                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            controller: 'orderDetailController',
            size: 'md',
            templateUrl: 'app/views/order/add.html',
            scope: modalScope
        });
    }


    //Desc:       Function to edit ordersService
    $scope.order = {};
    $scope.editOrder = function displayModal(data) {

        var index = $scope.gridOptions.data.indexOf(data);
        //make a copy of the data otherwise changes that's cancelled still reflect in the grid
        $scope.order = angular.copy(data);

        var scheduleDate = new Date(data.scheduleDeliveryDate);
        var scheduleMoment = moment(scheduleDate);
        $scope.order.scheduleDeliveryDate = scheduleMoment.format('DD/MM/YYYY');


        //$filter('date')(data.scheduleDeliveryDate, 'dd/MM/yyyy'); //'yyyy/MM/dd'
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };

        modalScope.updateOrder = function () {
            //Convert to API format
            var dateMoment = moment(modalScope.order.scheduleDeliveryDate, 'DD/MM/YYYY')
            modalScope.order.scheduleDeliveryDate = dateMoment.format("MM/DD/YYYY");

            switch ($scope.userRole) {
                case 'Logistics Controller':
                    ordersService.updateOrder(modalScope.order).then(function (response) {
                        $scope.gridOptions.data[index] = response.data;
                        //$.connection.clientHub.server.joinhub('OrdersScreen', 'true');
                    });
                    break;
                case 'Transport Controller':
                    ordersService.authorizeOrder(modalScope.order).then(function (response) {
                        $scope.gridOptions.data[index] = response.data;
                        //$.connection.clientHub.server.joinhub('OrdersScreen', 'true');
                    });
                    break;
                case 'Fleet Controller':
                    ordersService.assignDriver(modalScope.order).then(function (response) {
                        $scope.gridOptions.data[index] = response.data;
                        //$.connection.clientHub.server.joinhub('OrdersScreen', 'true');

                        if (response.data.statusName === ngStatus.assigned) {
                            // Send Order to Open Item 3
                            $scope.sendAssignedOrder(response.data.id);
                        }
                    });
                    break;
                default:
                    ordersService.updateOrder(modalScope.order).then(function (response) {
                        $scope.gridOptions.data[index] = response.data;
                        //hubsr.server.joinhub('OrdersScreen', 'true');

                        if (response.data.statusName === ngStatus.assigned) {
                            // Send Order to Open Item 3
                            $scope.sendAssignedOrder(response.data.id);
                        }
                    });
                    break;
            }


            modalScope.closeModal();
        };

        modalScope.modalInstance = $uibModal.open({
            controller: 'orderEditController',
            size: 'sm',
            templateUrl: '/app/views/order/edit.html',
            scope: modalScope
        });
    }

    ///Handles order delete functionality
    $scope.deleteOrder = function displayModal(data, type) {

        var index = $scope.gridOptions.data.indexOf(data);
        $scope.order = data;

        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };

        modalScope.deleteOrder = function () {
            if (type == ngResponse.cancel) {
                //API method from service  //cancelOrder
                ordersService.cancelOrder(modalScope.order).then(function (response) {
                    //Remove the data from the grid
                    if (response.data == ngResponse.success) {
                        $scope.gridOptions.data.splice(index, 1);
                    };

                });
            } else {
                ordersService.deleteOrder(modalScope.order).then(function (response) {
                    if (response.data == ngResponse.success) {
                        $scope.gridOptions.data.splice(index, 1);
                    };
                });
            }

            //$.connection.clientHub.server.joinhub('OrdersScreen', 'true');
            modalScope.closeModal();
        };

        modalScope.modalInstance = $uibModal.open({
            controller: 'orderDeleteController',
            size: 'md',
            templateUrl: '/app/views/order/delete.html',
            scope: modalScope
        });
    }

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

    $scope.$on('newOrder', function (event, args) {
        var order = args.order;
        $.connection.hub.url = signalR.url;
        $.connection.hub.start()
            .done(function () {
                $.connection.clientHub.server.newOrder(order);
            })
            .fail(function () {
                console.log('newOrder failed');
            });
    });

    $(document).ready(function () {
        $("#togglesearch").click(function (event) {
        });
    });

}]);

