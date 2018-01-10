'use strict';
app.controller("ticketsController", ['$scope', '$filter', 'ngStatus', 'remarksService', 'ownerService', 'statusService', 'ticketsService', 'priorityService', 'issuesService', 'authService', 'categoryService', 'typeService', 'departmentService', 'uiGridConstants', '$uibModal', function ($scope, $filter, ngStatus, remarksService, ownerService, statusService, ticketsService, priorityService, issuesService, authService, categoryService, typeService, departmentService, uiGridConstants, $uibModal) {

    $scope.Departments = []; 
    $scope.Priorities = []; 
    $scope.Categories = [];
    $scope.Types = [];
    $scope.Issues = [];
    $scope.Assign = [];
    $scope.Status = [];


    authService.getUsers().then(function (response) {
        $scope.Assign = response.data;
    });

    statusService.getStatus().then(function (response) {
        $scope.Status = response.data;
    });


    issuesService.getAll().then(function (response) {
        $scope.Issues = response.data;
    });

    categoryService.getAll().then(function (response) {
        $scope.Categories = response.data;
    });

    typeService.getAll().then(function (response) {
        $scope.Types = response.data;
    });

    departmentService.getAll().then(function (response) {
        $scope.Departments = response.data;
    });

    priorityService.getAll().then(function (response) {
        $scope.Priorities = response.data;
    });

    $scope.grdTickets = {};
    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdTickets = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'ActiveTickets_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Actice Tickets", style: 'headerStyle', alignment: 'center' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, alignment: 'center' };
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'A4',
        exporterPdfMaxGridWidth: 450,
        exporterIsExcelCompatible: true,
        exporterSuppressColumns: 'Actions',
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterFieldCallback: function (grid, row, col, input) {
            if (col.name == 'createdDate') {
                return moment(input).format('YYYY/MM/DD');
            }
            else { return input; }
        },
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [
            { field: 'ticketOwnerName', displayName: 'Owner', enableCellEdit: false, enableFiltering: true },
            { field: 'ticketTypeName', displayName: 'Type', enableCellEdit: false },
            { field: 'address', displayName: 'Community', enableCellEdit: false },
            { field: 'referenceNumber', displayName: 'Ref No', enableCellEdit: false },
              { field: 'description', displayName: 'Description', enableCellEdit: false, enableFiltering: true },
              { field: 'departmentName', displayName: 'Department', enableCellEdit: false },
              { field: 'ticketCategoryName', displayName: 'Category', enableCellEdit: false },
              { field: 'assignedToName', displayName: 'Field Worker', enableCellEdit: false },
              { field: 'ticketIssueName', displayName: 'Issue', enableCellEdit: false },
              //{ field: 'ticketStatusName', displayName: 'Status', enableCellEdit: false },
                                {
                                    field: 'ticketStatusName', displayName: 'Status', width: "7.5%", enableCellEdit: false,
                                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                                        if (grid.getCellValue(row, col) === 'New') {
                                            return 'label-success';
                                        }
                                        else
                                            if (grid.getCellValue(row, col) === 'Resolved') {
                                                return 'label-warning';
                                            }
                                            else
                                                if (grid.getCellValue(row, col) === 'Escalated') {
                                                    return 'label-danger';
                                                }
                                                else
                                                    if (grid.getCellValue(row, col) === 'Assigned') {
                                                    return 'label-info';
                                                }
                                    }
                                },
              { field: 'createdDate', displayName: 'Date Generated', enableCellEdit: false, cellFilter: 'date:\'dd/MM/yyyy\'' },
              //{ field: 'remarks', displayName: 'Remarks', enableCellEdit: false },
              
            {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-click="grid.appScope.editTicket(row.entity)" class="btn btn-default" aria-label="Left Align">' +
                     ' <span class="fa fa-edit fa-lg" aria-hidden="true"></span>' +
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

        ticketsService.getTickets().then(function (response) {
            $scope.grdTickets.data = response.data;
            $scope.Data = response.data;

        },
    function (error) {
        console.log('Error on Tickets: ' + error.data.message);
    });
    

    $scope.tickets = {
        id: 0,
        name: '',
        description: '',
        remarks: '',
        //ticketOwnerId: '',
        TicketTypeId:'',
        //assignedTo: '',
        DepartmentId: '',
        TicketStatusId: '',
        TicketPriorityId: '',
        TicketCategoryId:'',
        AssignedTo: '',
        ticketOwnerId: ''
    }

    $scope.saveTickets = function (owner) {
        $scope.tickets.ticketOwnerId = owner.data.id
        $scope.tickets.TicketTypeId = owner.data.ticketTypeId
        ticketsService.addTickets($scope.tickets).then(function (response) {
     
            //$scope.saveTicketRemarks(response);
            $scope.response(response);
        },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     $scope.message = "Failed to add ticket due to:" + errors.join(' ');
                 });
    };

    $scope.ticketUpdate = {};
    $scope.editTicket = function displayModal(data) {
        $scope.ticketUpdate = data;
        $scope.GetTicketRemarks(data);
        $scope.GetTicketOwner(data);
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateTicket = function () {
            ticketsService.updateTicket(modalScope.ticketUpdate).then(function (response) {
                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/tickets/update.html',
            scope: modalScope
        });
    };

    $scope.GetTicketRemarks = function (getId) {
        $scope.getTicketId = getId.id
        remarksService.getById($scope.getTicketId).then(function (response) {
            $scope.Remarks = response.data;
        },
        function (error) {
            console.log('Error on Tickets: ' + error.data.message);
        });
    };

    $scope.GetTicketOwner = function (owner) {
        $scope.getId = owner.ticketOwnerId
        ownerService.getById($scope.getId).then(function (response) {
            $scope.Owner = response.data;
        },
        function (error) {
            console.log('Error on Tickets: ' + error.data.message);
        });
    };

    $scope.ticketRemarks = {
        id: 0,
        TicketId: '',
        Description: ''        
    }
    $scope.saveTicketRemarks = function (remark) {
        $scope.ticketRemarks.TicketId = remark.data.id
        ticketsService.addTicketRemarks($scope.ticketRemarks).then(function (response) {
        },
                         function (response) {
                             var errors = [];
                             for (var key in response.data.modelState) {
                                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                                     errors.push(response.data.modelState[key][i]);
                                 }
                             }
                             $scope.message = "Failed to add ticket remarks due to:" + errors.join(' ');
                         });
    };

    $scope.toggleFiltering = function () {
        $scope.grdTickets.enableFiltering = !$scope.grdTickets.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    $scope.ticketOwner = {
        id: 0,
        name: '',
        surname: '',
        gender: '',
        idNumber: '',
        physicalAddress: '',
        email: '',
        phone: '',
        latitude: '',
        longitude: '',
        ticketTypeId:''
    }
    $scope.saveTicketOwners = function () {
        ticketsService.addTicketOwners($scope.ticketOwner).then(function (response) {
            $scope.saveTickets(response);
        },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     $scope.message = "Failed to add ticket owner due to:" + errors.join(' ');
                 });
    };

    $scope.registration = {
        password: 'Admin123',
        confirmPassword: 'Admin123',
        Id: 0,
        name: 'Admin',
        surname: 'Admin',
        userName: 'Admin',
        phoneNumber: '0710125210',
        Email:'admin@gmail.com',
        email: 'admin@gmail.com',
        role: 'TicketOwner',
        roleId: 'a95b2077-8c8b-4983-a928-ebfeb33d9789',
        AccessFailedCount: 0,
        LockoutEnabled: 0,
        TwoFactorEnabled: 0,
        PhoneNumberConfirmed: 0,
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {
            
            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    //
    $scope.resMessage = {
        msg:'',
        refNum:''
    };
    $scope.response = function displayModal(data) {
        $scope.resMessage.msg = "Reference Number";
        $scope.resMessage.refNum = data.data.referenceNumber;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        $scope.submitForm();

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/tickets/response.html',
            scope: modalScope
        });
    }


    $scope.submitForm = function () {
        $scope.ticketOwner = null; 
        $scope.ticketRemarks = null;
        $scope.tickets = null;
    };

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdTickets.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdTickets.data = $filter('filter')($scope.grdTickets.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);