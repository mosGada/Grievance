﻿'use strict';
app.controller("productController", ['$scope', '$filter', 'productService', 'uiGridConstants', '$uibModal', function ($scope, $filter, productService, uiGridConstants, $uibModal) {

    $scope.grdProduct = {};

    $scope.filterOptions = {
        filterText: ''
    };
    $scope.grdProduct = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Product_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Product", style: 'headerStyle', alignment: 'center' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, alignment: 'center' };
            return docDefinition;
        },
        exporterPdfPageSize: 'A4',
        exporterPdfOrientation: 'portrait',
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
        { field: 'code', displayName: 'Code', enableCellEdit: false },
        { field: 'description', displayName: 'Description', enableCellEdit: false },
        {
            name: "Actions",
            field: "Savebutton",
            cellTemplate:
                '<button type="button" ng-click="grid.appScope.editProduct(row.entity)" class="btn btn-default" aria-label="Left Align">' +
                 ' <span class="fa fa-edit fa-lg" aria-hidden="true"></span>' +
                 '</button>',
            enableCellEdit: false,
            width: "5.5%"
        }
        ]
    };

    productService.getProducts().then(function (response) {
        $scope.grdProduct.data = response.data;
        $scope.Data = response.data;
       
    },
   function (error) {
       console.log('Error on Products: ' + error.data.message);
   });

    $scope.toggleFiltering = function () {
        $scope.grdProduct.enableFiltering = !$scope.grdProduct.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Desc:     Function to add new product to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.product = {
            Id: 0,
            code: '',
            description: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveProduct = function () {
        
            productService.addProduct(modalScope.product).then(function (response) {
             
                $scope.grdProduct.data.splice(0, 0, {
                    createdDate: response.data.createdDate,
                    createdBy: response.data.createdBy,
                    code: response.data.code,
                    description: response.data.description,
                    updatedBy: response.data.updatedBy,
                    updatedDate: response.data.updatedDate
                });
                modalScope.closeModal();
                
            });
        };

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/product/add.html',
            scope: modalScope
        });

    }

    //Desc:       Function to edit product
    $scope.product = {};
    $scope.editProduct = function displayModal(data) {
        $scope.product = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateProduct = function () {           
            productService.updateProduct(modalScope.product).then(function (response) {
                modalScope.closeModal();               
            });
        }

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/product/edit.html',
            scope: modalScope
        });
    }

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdProduct.data = $scope.Data;

        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdProduct.data = $filter('filter')($scope.grdProduct.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);
