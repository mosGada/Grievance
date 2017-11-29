'use strict'
app.controller("deliveryTypeController", ['$scope', '$filter', 'deliveryTypeService', 'uiGridConstants', '$uibModal', function ($scope, $filter, deliveryTypeService, uiGridConstants, $uibModal) {

  
    $scope.grdDeliveryType = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdDeliveryType = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'DeliveryType_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Delivery Type", style: 'headerStyle', alignment: 'center' },
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
        { field: 'code', displayName: 'Code', enableCellEdit: false },
        { field: 'description', displayName: 'Description', enableCellEdit: false },
        {
            name: "Actions",
            field: "Savebutton",
            cellTemplate:
                '<button type="button" ng-click="grid.appScope.editDeliveryType(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

    deliveryTypeService.getDeliveryType().then(function (response) {
        $scope.grdDeliveryType.data = response.data;
        $scope.Data = response.data;      
    },
   function (error) {
       console.log('Error on Delivery Type: ' + error.data.message);
   });

    //Desc:     Function to add new deliveryType to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.deliveryType = {
            Id: 0,
            code: '',
            description: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveDeliveryType = function () {
            deliveryTypeService.addDeliveryType(modalScope.deliveryType).then(function (response) {
                $scope.grdDeliveryType.data.splice(0, 0, {
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
            templateUrl: '/app/views/maintenance/deliveryType/add.html',
            scope: modalScope
        });

    }

    //Desc:       Function to edit deliveryType
    $scope.deliveryType = {};
    $scope.editDeliveryType = function displayModal(data) {
        $scope.deliveryType = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateDeliveryType = function () {
            deliveryTypeService.updateDeliveryType(modalScope.deliveryType).then(function (response) {
                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/deliveryType/edit.html',
            scope: modalScope
        });
    }


    $scope.toggleFiltering = function () {
        $scope.grdDeliveryType.enableFiltering = !$scope.grdDeliveryType.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdDeliveryType.data = $scope.Data;

        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdDeliveryType.data = $filter('filter')($scope.grdDeliveryType.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };


}]);
