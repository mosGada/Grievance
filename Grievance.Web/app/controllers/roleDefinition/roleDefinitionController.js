'use strict';
app.controller('roleDefinitionController', ['$scope', '$filter', 'roleDefinitionService', 'uiGridConstants', '$timeout', '$uibModal',  function ($scope, $filter, roleDefinitionService, $timeout, uiGridConstants, $uibModal) {

       $scope.gridRoleOptions = {};

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.gridRoleOptions = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Role_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Role", style: 'headerStyle', alignment: 'center' },
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
    
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [

           
              { field: 'Name', displayName: 'Role', enableCellEdit: false },
             {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-click="grid.appScope.editRole(row.entity)" class="btn btn-default" aria-label="Left Align">' +
                     ' <span class="fa fa-edit fa-lg" aria-hidden="true"></span>' +
                     '</button>' ,                    
                enableCellEdit: false,
                enableFiltering: false,
                enableSorting: false,
                showSortMenu: false,
                enableColumnMenu: false,
                width: "9.5%"
             }
        ]
    };
    $scope.toggleFiltering = function () {
        $scope.gridRoleOptions.enableFiltering = !$scope.gridRoleOptions.enableFiltering;
           };

    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.role = {
            Id: 0,
            Name: '',
           
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };

        modalScope.saveRoleDefinition = function () {
            roleDefinitionService.saveRole(modalScope.role).then(function (response) {
                
                $scope.gridRoleOptions.data.splice(0, 0, modalScope.role
                );
                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            controller: 'roleDefinitionController',
            size: 'md',
            templateUrl: 'app/views/maintenance/roleDefinition/add.html',
            scope: modalScope
        });
    }

    $scope.roleDefinition = {};

    $scope.editRole = function displayModal(data) {
        $scope.roleDefinition = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;

        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        };

        modalScope.updateRoleDefinition = function () {
            roleDefinitionService.updateRoleDefinition(modalScope.roleDefinition).then(function (response) {
                modalScope.closeModal();
            });           
        };

        modalScope.modalInstance = $uibModal.open({
             size: 'md',
            templateUrl: '/app/views/maintenance/roleDefinition/edit.html',
            scope: modalScope
        });

    };


    roleDefinitionService.getRoles().then(function (response) {
        $scope.gridRoleOptions.data = response.data;
        $scope.Data = response.data;
    
    },
  function (error) {
      console.log('Error on Role: ' + error.data.message);
  });

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.gridRoleOptions.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.gridRoleOptions.data = $filter('filter')($scope.gridRoleOptions.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);