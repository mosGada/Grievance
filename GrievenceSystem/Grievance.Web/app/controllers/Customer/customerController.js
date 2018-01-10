'use strict';
app.controller("customerController", ['$scope', '$filter', 'customerService', 'uiGridConstants', '$uibModal', function ($scope, $filter, customerService, uiGridConstants, $uibModal) {
   
    $scope.grdCustomer = {};

    $scope.filterOptions = {
        filterText: ''
    };


    $scope.grdCustomer = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Customer_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Customer", style: 'headerStyle', alignment: 'center' },
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
        exporterPdfMaxGridWidth: 700,
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
        { field: 'createdDate', displayName: 'Creation Date', type: 'date', cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true, enableCellEdit: false },
        { field: 'createdBy', displayName: 'Entered by', enableCellEdit: false },
        { field: 'code', displayName: 'Code', enableCellEdit: false },
        { field: 'name', displayName: 'Name', enableCellEdit: false },
        { field: 'business', displayName: 'Business', enableCellEdit: false },
        {
            name: "Actions",
            field: "Savebutton",
            cellTemplate:
                '<button type="button" ng-click="grid.appScope.editCustomer(row.entity)" class="btn btn-default" aria-label="Left Align">' +
                 ' <span class="fa fa-edit fa-lg" aria-hidden="true"></span>' +
                 '</button>',
            enableCellEdit: false,
            enableFiltering: false,
            enableSorting: false,
            showSortMenu: false,
            enableColumnMenu: false,
            width: "5.5%"
        }
        ]
    };
    customerService.getCustomers().then(function (response) {
        $scope.grdCustomer.data = response.data;
        $scope.Data = response.data;
    },
   function (error) {
       console.log('Error on Customer: ' + error.data.message);
   });

    $scope.toggleFiltering = function () {
        $scope.grdCustomer.enableFiltering = !$scope.grdCustomer.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Desc:     Function to add new customer to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.customer = {
            Id: 0,
            code: '',
            name: '',
            business: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveCustomer = function () {
            customerService.addCustomer(modalScope.customer).then(function (response) {
                $scope.grdCustomer.data.splice(0, 0, {
                    createdDate: response.data.createdDate,
                    createdBy: response.data.createdBy,
                    code: response.data.code,
                    name: response.data.name,
                    business: response.data.business,
                    updatedBy: response.data.updatedBy,
                    updatedDate: response.data.updatedDate
                });
                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/customer/add.html',
            scope: modalScope
        });

    }


    //Desc:       Function to edit customer
    $scope.customer = {};
    $scope.editCustomer = function displayModal(data) {
        $scope.customer = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateCustomer = function () {
            customerService.updateCustomer(modalScope.customer).then(function (response) {
                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/customer/edit.html',
            scope: modalScope
        });
    }

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdCustomer.data = $scope.Data;

        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdCustomer.data = $filter('filter')($scope.grdCustomer.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };


}]);
