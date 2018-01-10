'use strict';
app.controller("laserDataController", ['$scope', '$filter', 'laserDataService', 'uiGridConstants', '$uibModal', function ($scope, $filter, laserDataService, uiGridConstants, $uibModal) {
    $scope.grdLaserData = {};
    $scope.deviceList = {};
    $scope.deviceData = {};
    $scope.finalLaserData = [];

    $scope.filterOptions = {
        filterText: ''
    };
   
    $scope.grdLaserData = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Laser_Data_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [25, 25, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Laser Data", style: 'headerStyle', alignment: 'center' },
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

        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [
              { field: 'deviceId', displayName: 'DeviceId', enableCellEdit: false, width: "9%" },
              { field: 'customerName', displayName: 'Location', enableCellEdit: false },
              { field: 'description', displayName: 'Description', enableCellEdit: false },
              { field: 'data', displayName: 'Data', enableCellEdit: false, width: "6.5%" },

              ,
              {
                  field: 'total', displayName: 'Orders', enableCellEdit: false, width: "6.5%",
                  cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                      if (row.entity.data > grid.getCellValue(row, col)) {
                          return 'text-success-orders';
                      }
                      else {
                          return 'text-danger-orders';
                      }
                  }
              }

        ]
    };

    laserDataService.getGetAllLaserData().then(function (response) {
        $scope.grdLaserData.data = response.data;
        $scope.Data = response.data;
          },
    function (error) {
        console.log('Error on Laser Data: ' + error.data.message);
    });

    $scope.toggleFiltering = function () {
        $scope.grdCustomer.enableFiltering = !$scope.grdCustomer.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

}]);
