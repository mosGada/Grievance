/// <reference path="../../views/maintenance/users/add.html" />
'use strict';
app.controller('accountController', ['$scope', '$filter', '$uibModal', '$location', '$timeout', 'authService', 'uiGridConstants', 'roleDefinitionService',  function ($scope, $filter, $uibModal, $location, $timeout, authService, uiGridConstants, roleDefinitionService) {

   
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
            { field: 'userName', displayName: 'User Name', enableCellEdit: false },
            { field: 'phoneNumber', displayName: 'Contact Number', enableCellEdit: false,width:'10%' },
            { field: 'email', displayName: 'Email', enableCellEdit: false },
           { field: 'roleName', displayName: 'Role', enableCellEdit: false },
          {
              name: "Actions",
              field: "Savebutton",
              cellTemplate:
                  '<button type="button" ng-click="grid.appScope.editusers(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

    //
    $scope.getrolebyroleName = function (roleName) {
        var found = $filter('filter')($scope.role, { name: roleName }, true);

        if (found.length) {
            return found[0].id;
        } else {
            return roleName;
        }
    };

    //gets all roles and inserts them into arrary to be used on  $scope.getroles
    roleDefinitionService.getRoles().then(function (response) {
        $scope.role = response.data;

        for (var i = 0; i < $scope.role.length; i++) {
            for (var v = 0; v < $scope.role[i].users.length; v++) {
                $scope.userAndRoleid.push({
                    UserId: $scope.role[i].users[v].userId,
                    RoleId: $scope.role[i].users[v].roleId,
                    Name: $scope.role[i].name
                });
            }
        }
    });


    $scope.addNew = function () {

        var modalScope = $scope.$new();

            modalScope.registration = {
                Id: 0,
                name: '',
                surname: '',
                userName: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                email: '',
                role: '',
                roleId: '',
                //idNumber: '',
                //contactNumber: '',
                //alternativeNumber: '',
                //physicalAdress: ''

            };
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

            modalScope.saveUser = function () {
                authService.saveRegistration(modalScope.registration).then(function (response) {

                    $scope.gridUsersOptions.data.splice(0, 0, {
                        Id: response.data,
                        Name: modalScope.registration.name,
                        Surname: modalScope.registration.surname,
                        UserName: modalScope.registration.userName,
                        phoneNumber: modalScope.registration.phoneNumber,
                        Password: modalScope.registration.password,
                        ConfirmPassword: modalScope.registration.confirmPassword,
                        Email: modalScope.registration.email,
                        roleName: $scope.getrolebyroleID(modalScope.registration.role),
                        //RoleId: modalScope.registration.role,
                        //ContactNumber: modalScope.registration.contactNumber,
                        //AlternativeNumber: modalScope.registration.alternativeNumber,
                        //PhysicalAdress: modalScope.registration.physicalAdress
                    });
                    modalScope.closeModal();
                });
            };

        modalScope.modalInstance = $uibModal.open({
            controller: 'accountController',
            size: 'md',
            templateUrl: 'app/views/maintenance/account/add.html',
            scope: modalScope
        });

    }

    $scope.registration = {};
    $scope.editusers = function displayModal(data) {
   
        var index = $scope.gridUsersOptions.data.indexOf(data);
  
       
        $scope.registration = data;
        $scope.registration.confirmPassword = data.password;
        //$scope.registration.RoleId = $scope.getrolebyroleName(data.roleName);
        $scope.registration.company =$scope.getCompnayID(data.companyName);




        var modalScope = $scope.$new();

        modalScope.ParentScope = $scope;
        //$scope.registration.companyName=
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };
        //update method 
        modalScope.updateuser = function () {


            modalScope.registration.role = data.RoleId;
            modalScope.registration.companyId = data.company;
            modalScope.registration.companyName = $scope.getCompnayname(data.company);
            modalScope.registration.roleName = $scope.getrolebyroleID(data.RoleId);
            modalScope.registration.UserId = modalScope.registration.Id;
            //update method from the service authservice
            authService.updateuser(modalScope.registration).then(function (response) {
                var index = $scope.gridUsersOptions.data.indexOf(data);


            });

            modalScope.closeModal();
        };
        //opens a modal for editing the user details 

        modalScope.modalInstance = $uibModal.open({

            controller: 'accountController',
            size: 'sm',
            templateUrl: '/app/views/maintenance/account/edit.html',
            scope: modalScope
        });
    };

    function message(alertmessage) {
        $scope.message = alertmessage;
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

