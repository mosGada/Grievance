'use strict';
app.controller("companyController", ['$scope', '$filter', 'companyService', 'uiGridConstants', '$uibModal', function ($scope, $filter, companyService, uiGridConstants, $uibModal) {

    $scope.grdCompany = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdCompany = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Company_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Company", style: 'headerStyle', alignment: 'center' },
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
              { field: 'createdDate', displayName: 'Creation Date', type: 'date',enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true },
              { field: 'createdBy', displayName: 'Entered by', enableCellEdit: false },
              { field: 'name', displayName: 'Name', enableCellEdit: false },
            {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-click="grid.appScope.editCompany(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

    companyService.getCompanies().then(function (response) {
        $scope.grdCompany.data = response.data;
        $scope.Data = response.data;  
    },
function (error) {
    console.log('Error on Transporter: ' + error.data.message);
});

    $scope.toggleFiltering = function () {
        $scope.grdCompany.enableFiltering = !$scope.grdCompany.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Desc:     Function to add new company to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.company = {
            Id: 0,
            Name: '',
            IsTransport: '',
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveCompany = function () {
            companyService.addCompany(modalScope.company).then(function (response) {
                $scope.grdCompany.data.splice(0, 0, {
                    createdDate: response.data.createdDate,
                    createdBy: response.data.createdBy,
                    name: response.data.name,
                    isTransport: response.data.isTransport,
                    updatedBy: response.data.updatedBy,
                    updatedDate: response.data.updatedDate
                });
                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/company/add.html',
            scope: modalScope
        });

    }

    //Desc:       Function to edit company
    $scope.company = {};
    $scope.editCompany = function displayModal(data) {
        $scope.company = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateCompany = function () {
            companyService.updateCompany(modalScope.company).then(function (response) {
                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/company/edit.html',
            scope: modalScope
        });
    }

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdCompany.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdCompany.data = $filter('filter')($scope.grdCompany.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);
