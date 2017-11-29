'use strict';
app.controller("ticketsCompletedController", ['$scope', '$filter', 'ticketsService', 'priorityService', 'categoryService', 'departmentService', 'uiGridConstants', '$uibModal', function ($scope, $filter, ticketsService, priorityService, categoryService, departmentService, uiGridConstants, $uibModal) {



    $scope.grdStatus = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdStatus = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Status_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [20, 20, 20, 0] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Status", style: 'headerStyle', alignment: 'center' },
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
        exporterPdfMaxGridWidth: 480,
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
              { field: 'createdDate', displayName: 'Creation Date', width: "14%", enableCellEdit: false, type: 'date', cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true },
              { field: 'createdBy', displayName: 'Entered by', enableCellEdit: false },
              { field: 'name', displayName: 'Name', enableCellEdit: false },
              { field: 'description', displayName: 'Description', enableCellEdit: false },
              {
                  name: "Actions",
                  field: "Savebutton",
                  cellTemplate:
                      '<button type="button" ng-click="grid.appScope.editStatus(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

    ticketsService.getTickets().then(function (response) {
        $scope.grdStatus.data = response.data;
        $scope.Data = response.data;

    },
function (error) {
    console.log('Error on Status Type: ' + error.data.message);
});

//    statusService.getStatus().then(function (response) {
//        $scope.grdStatus.data = response.data;
//        $scope.Data = response.data;
//    },
//function (error) {
//    console.log('Error on Status: ' + error.data.message);
//});

    $scope.toggleFiltering = function () {
        $scope.grdStatus.enableFiltering = !$scope.grdStatus.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    
    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdStatus.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdStatus.data = $filter('filter')($scope.grdStatus.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}]);