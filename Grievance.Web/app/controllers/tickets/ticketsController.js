'use strict';
app.controller("ticketsController", ['$scope', '$filter', 'ngStatus', 'remarksService', 'ownerService', 'statusService', 'ticketsService', 'priorityService', 'issuesService', 'authService', 'categoryService', 'typeService', 'departmentService', 'uiGridConstants', '$uibModal', function ($scope, $filter, ngStatus, remarksService, ownerService, statusService, ticketsService, priorityService, issuesService, authService, categoryService, typeService, departmentService, uiGridConstants, $uibModal) {

    $scope.buttonName = 'Update';
    $scope.showChatTag = true;

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

    //**********************************************************************************************
    //*UI Grid
    //**********************************************************************************************
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
            { field: 'ticketTypeName', displayName: 'Type', enableCellEdit: false },
            { field: 'referenceNumber', displayName: 'Ref No', enableCellEdit: false },
              { field: 'description', displayName: 'Description', enableCellEdit: false, enableFiltering: true },
              { field: 'departmentName', displayName: 'Department', enableCellEdit: false },
              { field: 'ticketCategoryName', displayName: 'Category', enableCellEdit: false },
              { field: 'assignedToName', displayName: 'Field Worker', enableCellEdit: false },
              { field: 'ticketIssueName', displayName: 'Issue', enableCellEdit: false },
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

    //**********************************************************************************************
    //*Call GetTickets 
    //**********************************************************************************************
        ticketsService.getTickets().then(function (response) {
            $scope.grdTickets.data = response.data;
            $scope.Data = response.data;

        },
    function (error) {
        console.log('Error on Tickets: ' + error.data.message);
    });
    
    //**********************************************************************************************
    //*Add Tickets
    //**********************************************************************************************
    $scope.tickets = {
        id: 0,
        name: '',
        description: '',
        ticketTypeId:'',
        DepartmentId: '',
        ticketStatusId: '',
        TicketPriorityId: '',
        TicketCategoryId:'',
        AssignedTo: '',
        ticketOwnerId: '',
        ticketIssueId: ''
    }
    $scope.saveTickets = function (owner) {
        $scope.tickets.ticketOwnerId = owner.data
        ticketsService.addTickets($scope.tickets).then(function (response) {
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

    //**********************************************************************************************
    //*Get Ticket Owner
    //**********************************************************************************************
    $scope.ownerID = '';
    $scope.GetTicketOwner = function (owner) {
        authService.getAccountById(owner).then(function (response) {
            $scope.oDetails = response.data;
        },
        function (error) {
            console.log('Error on Tickets: ' + error.data.message);
        });
    };

    //**********************************************************************************************
    //*Update Ticket 
    //**********************************************************************************************
    $scope.getTicketId = '';
    $scope.ticketUpdate = {};
    $scope.editTicket = function displayModal(data) {
        $scope.ticketUpdate = data;
        $scope.GetTicketOwner(data.ticketOwnerId);
        $scope.getTicketId = data.id;
        $scope.GetTicketRemarks(data.id);

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
            size: 'lg',
            templateUrl: '/app/views/tickets/update.html',
            scope: modalScope
        });
    };

    //**********************************************************************************************
    //*Get Ticket Remarks
    //**********************************************************************************************
    $scope.GetTicketRemarks = function (ticket_id) {
        remarksService.getById(ticket_id).then(function (response) {
            $scope.Remarks = response.data;
        },
        function (error) {
            console.log('Error on Tickets: ' + error.data.message);
        });
    };

    //**********************************************************************************************
    //*Save Ticket Remarks 
    //**********************************************************************************************
    $scope.ticketRemarks = {
        id: 0,
        type: 'file',
        ticketId: '',
        description: ''        
    }
    $scope.saveTicketRemarks = function () {
        $scope.ticketRemarks.ticketId = $scope.getTicketId
        remarksService.addRemark($scope.ticketRemarks).then(function (response) {
            
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

    //**********************************************************************************************
    //*Filtering 
    //**********************************************************************************************
    $scope.toggleFiltering = function () {
        $scope.grdTickets.enableFiltering = !$scope.grdTickets.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    //**********************************************************************************************
    //*Save Ticket Owner
    //**********************************************************************************************
    $scope.ticketOwner = {
        password: 'Admin123',
        confirmPassword: 'Admin123',
        name: '',
        surname: '',
        userName: '',
        phoneNumber: '',
        Email: '',
        email: '',
        role: 'TicketOwner',
        roleId: 'a95b2077-8c8b-4983-a928-ebfeb33d9789',
        AccessFailedCount: 0,
        LockoutEnabled: 0,
        TwoFactorEnabled: 0,
        PhoneNumberConfirmed: 0,
        Gender: '',
        IDNumber: '',
        PhysicalAddress: ''
    };
    $scope.saveTicketOwners = function () {
        if ($scope.tickets.ticketTypeId === 1)
        {
            authService.saveRegistration($scope.ticketOwner).then(function (response) {
                $scope.saveTickets(response);
                $scope.savedSuccessfully = true;
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
        }
        else {
            $scope.ticketOwner_Id = '4780d8a4-7a74-4566-acba-7ec03b5878d0';
            $scope.saveTickets($scope.ticketOwner_Id);
        }              
    };

    //**********************************************************************************************
    //*Display response message
    //**********************************************************************************************
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
            size: 'lg',
            templateUrl: '/app/views/tickets/response.html',
            scope: modalScope
        });
    }

    //**********************************************************************************************
    //*Clear Form
    //**********************************************************************************************
    $scope.submitForm = function () {
        $scope.ticketOwner = null; 
        $scope.ticketRemarks = null;
        $scope.tickets = null;
    };

    //**********************************************************************************************
    //*Global search filter 
    //**********************************************************************************************
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