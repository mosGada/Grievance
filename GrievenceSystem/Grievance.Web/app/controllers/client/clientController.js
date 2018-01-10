'use strict'
app.controller("clientController", ['$scope', '$filter', 'clientService', 'uiGridConstants', '$uibModal', , function ($scope, $filter, clientService, uiGridConstants, $uibModal) {

    
   
    $scope.grdClient = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdClient = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'Client_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Client", style: 'headerStyle', alignment: 'center' },
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
              { field: 'id', displayName: 'ID', type: 'date', enableCellEdit: false, enableFiltering: true },
              { field: 'secret', displayName: 'Secret', enableCellEdit: false },
              { field: 'name', displayName: 'Name', enableCellEdit: false },
              { field: 'applicationType', displayName: 'ApplicationType', enableCellEdit: false },
              { field: 'active', displayName: 'Active', enableCellEdit: false },
              { field: 'refreshTokenLifeTime', displayName: 'RefreshTokenLifeTime', enableCellEdit: false },
              { field: 'allowedOrigin', displayName: 'AllowedOrigin', enableCellEdit: false },
        ]
    };

    clientService.getClient().then(function (response) {
        $scope.grdClient.data = response.data;
        $scope.data = response.data;
       
    },
function (error) {
    console.log('error on client: ' + error.data.message);
});

    $scope.toggleFiltering = function () {
        $scope.grdClient.enableFiltering = !$scope.grdClient.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

    };

    //Desc:     Function to add new client to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.client = {
            id: '',
            secret:'',
            name:'',
            applicationType: '',
            active: '',
            refreshTokenLifeTime:'',
            allowedOrigin:''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }
        
        modalScope.saveClient = function () {
            clientService.addClient(modalScope.client).then(function (response) {
                $scope.grdClient.data.splice(0, 0, {
                    id: response.data.id,
                    secret: response.data.secret,
                    name: response.data.name,
                    applicationType: response.data.applicationType,
                    active: response.data.active,
                    refreshTokenLifeTime: response.data.refreshTokenLifeTime,
                    allowedOrigin: response.data.allowedOrigin
                });
                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/client/add.html',
            scope: modalScope
        });

    }


    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdClient.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdClient.data = $filter('filter')($scope.grdClient.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };

}])