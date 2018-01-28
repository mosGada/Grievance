/// <reference path="../../views/maintenance/users/add.html" />
'use strict';
app.controller('accountController', ['$scope', '$filter', '$uibModal', '$location', '$timeout', 'authService', 'ticketsService', 'typeService', 'statusService', 'issuesService', 'categoryService', 'departmentService', 'priorityService', 'uiGridConstants', function ($scope, $filter, $uibModal, $location, $timeout, authService, ticketsService, typeService, statusService, issuesService, categoryService, departmentService, priorityService, uiGridConstants) {

    $scope.buttonName = 'Save';
    $scope.showChatTag = false;

    $scope.savedSuccessfully = false;
    $scope.message = "";
    //declaraion of variables to be used
    var UserData = [];
    $scope.roles = [];
    $scope.role = [];
    $scope.Userroles = [];
    $scope.userAndRoleid = [];
    $scope.gridUsersOptions = {};



    $scope.filterOptions = {
        filterText: ''
    };



    //colomn definintion on for the grid
    var usercolumnDefs = [
            { field: 'name', displayName: 'Name', enableCellEdit: false },
            { field: 'surname', displayName: 'Surname', enableCellEdit: false },
            { field: 'idNumber', displayName: 'Id Number', enableCellEdit: false },
            { field: 'gender', displayName: 'Gender', enableCellEdit: false },
            { field: 'phoneNumber', displayName: 'Contact Number', enableCellEdit: false, width: '10%' },
            { field: 'physicalAddress', displayName: 'Physical Address', enableCellEdit: false },
          {
              name: "Actions",
              field: "Savebutton",
              cellTemplate:
                  '<button type="button" ng-click="grid.appScope.editOwner(row.entity)" class="btn btn-default" aria-label="Left Align">' +
                   ' <span class="fa fa-edit fa-lg" aria-hidden="true"></span>' +
                   '</button>',
              enableCellEdit: false,
              enableFiltering: false,
              enableSorting: false,
              showSortMenu: false,
              enableColumnMenu: false,
              width: "5.5%"
          }

    ];
    //colomn definintion assigned

    $scope.gridUsersOptions = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'User_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 8 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 8, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Users", style: 'headerStyle', alignment: 'center' },
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
            //if (col.name == 'createdDate') {
            //    return moment(input).format('YYYY/MM/DD');
            //}
            //else { return input; }
        },
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: usercolumnDefs,
        data: UserData

    };

    authService.getUsers().then(function (response) {
        $scope.gridUsersOptions.data = response.data;
        $scope.Data = response.data;
    });

    $scope.toggleFiltering = function () {
        $scope.gridUsersOptions.enableFiltering = !$scope.gridUsersOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    ///get role by roleID
    $scope.getrolebyroleID = function (roleid) {
        var found = $filter('filter')($scope.role, { id: roleid }, true);

        if (found.length) {
            return found[0].name;
        } else {
            return roleid;
        }
    };

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
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

    
    $scope.getrolebyroleName = function (roleName) {
        var found = $filter('filter')($scope.role, { name: roleName }, true);

        if (found.length) {
            return found[0].id;
        } else {
            return roleName;
        }
    };

    $scope.registration = {
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
        PhysicalAddress: '',
        ticketTypeId: ''//,
        //Latitude: '',
        //Longitude:''
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {
            //  $scope.saveTickets(response);
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

    $scope.getOwnerId = '';
    $scope.oDetails = {}
    $scope.editOwner = function displayModal(data) {
        $scope.oDetails = data;
        $scope.ticketUpdate.ticketTypeId = 1;
        $scope.getOwnerId = data.id;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        //modalScope.updateOwner = function () {
        //    ticketsService.updateTicket(modalScope.ticketUpdate).then(function (response) {
        //        modalScope.closeModal();
        //    });
        //}
        modalScope.modalInstance = $uibModal.open({
            size: 'lg',
            templateUrl: '/app/views/tickets/update.html',
            scope: modalScope
        });
    };

    $scope.ticketUpdate = {
        id: 0,
        name: '',
        description: '',
        ticketTypeId: '',
        DepartmentId: '',
        ticketStatusId: '',
        TicketPriorityId: '',
        TicketCategoryId: '',
        AssignedTo: '',
        ticketOwnerId: '',
        ticketIssueId: ''
    }
    $scope.updateTicket = function () {
        $scope.ticketUpdate.ticketOwnerId = $scope.getOwnerId;
        ticketsService.addTickets($scope.ticketUpdate).then(function (response) {
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

    $scope.resMessage = {
        msg: '',
        refNum: ''
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
    //*Call Ticket Controller
    //**********************************************************************************************
    //$scope.tickets = {
    //    id: 0,
    //    name: '',
    //    description: '',
    //    ticketTypeId: '',
    //    DepartmentId: '',
    //    ticketStatusId: '',
    //    TicketPriorityId: '',
    //    TicketCategoryId: '',
    //    AssignedTo: '',
    //    ticketOwnerId: '',
    //    ticketIssueId: ''
    //}
    $scope.addTicket = function () {
        var modalScope = $scope.$new();

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.modalInstance = $uibModal.open({
            controller: 'ticketsController',
            size: 'lg',
            templateUrl: '/app/views/tickets/logticket.html',
            scope: modalScope
        });
    }

    //**********************************************************************************************
    //*Save Ticket Owner
    //**********************************************************************************************
    //$scope.ticketOwner = {
    //    password: 'Admin123',
    //    confirmPassword: 'Admin123',
    //    name: '',
    //    surname: '',
    //    userName: '',
    //    phoneNumber: '',
    //    Email: '',
    //    email: '',
    //    role: 'TicketOwner',
    //    roleId: 'a95b2077-8c8b-4983-a928-ebfeb33d9789',
    //    AccessFailedCount: 0,
    //    LockoutEnabled: 0,
    //    TwoFactorEnabled: 0,
    //    PhoneNumberConfirmed: 0,
    //    Gender: '',
    //    IDNumber: '',
    //    PhysicalAddress: ''
    //};
    //$scope.saveTicketOwners = function () {
    //    if ($scope.tickets.ticketTypeId === 1) {
    //        authService.saveRegistration($scope.ticketOwner).then(function (response) {
    //            $scope.saveTickets(response);
    //            $scope.savedSuccessfully = true;
    //        },
    //         function (response) {
    //             var errors = [];
    //             for (var key in response.data.modelState) {
    //                 for (var i = 0; i < response.data.modelState[key].length; i++) {
    //                     errors.push(response.data.modelState[key][i]);
    //                 }
    //             }
    //             $scope.message = "Failed to register user due to:" + errors.join(' ');
    //         });
    //    }
    //    else {
    //        $scope.ticketOwner_Id = '4780d8a4-7a74-4566-acba-7ec03b5878d0';
    //        $scope.saveTickets($scope.ticketOwner_Id);
    //    }
    //};


    $scope.submitForm = function () {
        $scope.ticketOwner = null;
        $scope.ticketRemarks = null;
        $scope.tickets = null;
    };

    $scope.refreshData = function (termObj) {

        $scope.gridUsersOptions.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.gridUsersOptions.data = $filter('filter')($scope.gridUsersOptions.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };


}]);

