/// <reference path="driverController.js" />
'use strict';
app.controller("driverController", ['$scope', '$filter', 'authService', 'driverService', 'uiGridConstants', '$uibModal', function ($scope, $filter, authService, driverService, uiGridConstants, $uibModal) {

    ///start the spinner
       $scope.grdDriver = {};
    $scope.Companynames = [];

    $scope.filterOptions = {
        filterText: ''
    };



    $scope.grdDriver = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Driver_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Driver", style: 'headerStyle', alignment: 'center' },
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
              { field: 'createdDate', displayName: 'Creation Date', type: 'date', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true },
              { field: 'createdBy', displayName: 'Entered by', enableCellEdit: false },
              { field: 'name', displayName: 'Drivers Name', enableCellEdit: false },
              { field: 'userName', displayName: 'User Name', enableCellEdit: false },
              { field: 'companyName', displayName: 'Company Name', enableCellEdit: false },
              { field: 'isActive', displayName: 'Active', enableCellEdit: false },
            {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-click="grid.appScope.editDriver(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

    driverService.getDrivers().then(function (response) {

        $scope.grdDriver.data = response.data;
        $scope.Data = response.data;
        ///close the spinner
      
    },
function (error) {
    console.log('Error on Driver: ' + error.data.message);
});






    $scope.toggleFiltering = function () {
        $scope.grdDriver.enableFiltering = !$scope.grdDriver.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Desc:     Function to add new driver to Database
    $scope.addNew = function () {

        var modalScope = $scope.$new();

        modalScope.driver = {
            Id: 0,
            Name: '',
            userName: '',
            Email: '',
            companyName: '',
            CompanyId: '',
            IsActive: '',
            CreatedDate: '',
            CreatedBy: '',
            UpdatedBy: '',
            UpdatedDate: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveDriver = function () {

            driverService.addDrives(modalScope.driver).then(function (response) {

                $scope.grdDriver.data.splice(0, 0, {
                    createdDate: response.data.createdDate,
                    createdBy: response.data.createdBy,
                    name: response.data.name,
                    userName: response.data.userName,
                    companyName: response.data.companyName,
                    companyId: response.data.companyId,
                    isActive: response.data.isActive,
                    updatedBy: response.data.updatedBy,
                    updatedDate: response.data.updatedDate
                });
                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            controller: 'driverDetailController',
            size: 'md',
            templateUrl: 'app/views/maintenance/driver/add.html',
            scope: modalScope
        });

    }

    //Desc:       Function to edit driverService
    $scope.driver = {};
    $scope.editDriver = function displayModal(data) {

        var index = $scope.grdDriver.data.indexOf(data);
        $scope.driver = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;

        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateDriver = function () {
            driverService.updateDriver(modalScope.driver).then(function (response) {

                $scope.grdDriver.data[index] = response.data;

                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            controller: 'driverEditController',
            size: 'md',
            templateUrl: '/app/views/maintenance/driver/edit.html',
            scope: modalScope
        });
    }

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdDriver.data = $scope.Data;

        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdDriver.data = $filter('filter')($scope.grdDriver.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);