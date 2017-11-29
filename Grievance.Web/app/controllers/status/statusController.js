'use strict';
app.controller("statusController", ['$scope', '$filter', 'statusService', 'statusTypeService', 'uiGridConstants', '$uibModal', function ($scope, $filter, statusService, statusTypeService, uiGridConstants, $uibModal) {


   
    $scope.grdStatus = {};

    $scope.filterOptions = {
        filterText: ''
    };
    
    //hits url correctly and wants to download Hubs.js
    //$.connection.hub.url = signalrBase; 
    //var hubsr = $.connection.clientHub;
    //$.connection.hub.logging = true;

    ////one method needs to be declared before .start will take effect
    //hubsr.client.refreshscreen = function () {
    //    //console.log('refreshScreen hit');
       

    //    statusService.getStatus().then(function (response) {
    //        $scope.grdStatus.data = response.data;
    //        $scope.Data = response.data;
          
    //    });
    //}

    //hubsr.client.joinhub = function (connectID, screenName) {
    //    //console.log(connectID + ' has joined the hub')
    //}

    //$.connection.hub.start();

    //$.connection.hub.start().done(function () {
    //    //Join the Hub and tell it on which screen we are
    //    hubsr.server.joinhub('StatusScreen', 'false');
    //});

    //$scope.$on('$routeChangeStart', function (next, current) {
    //    hubsr.server.leavehub('StatusScreen');
    //});

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

    statusService.getStatus().then(function (response) {
        $scope.grdStatus.data = response.data;
        $scope.Data = response.data;       
    },
function (error) {
    console.log('Error on Status: ' + error.data.message);
});

    $scope.toggleFiltering = function () {
        $scope.grdStatus.enableFiltering = !$scope.grdStatus.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      
    };

    //Desc:     Function to add new status to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.status = {
            Id: 0,
            Name: '',
            Description: '',
            StatusTypeId: '',
            CreatedDate: '',
            CreatedBy: '',
            UpdatedBy: '',
            UpdatedDate: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveStatus = function () {
            statusService.addStatus(modalScope.status).then(function (response) {
                $scope.grdStatus.data.splice(0, 0, {
                    createdDate: response.data.createdDate,
                    createdBy: response.data.createdBy,
                    name: response.data.name,
                    description: response.data.description,
                    statusTypeId: response.data.statusTypeId,
                    updatedBy: response.data.updatedBy,
                    updatedDate: response.data.updatedDate
                });

                //tell all listening to refresh
                hubsr.server.joinhub('StatusScreen', 'true');

                modalScope.closeModal();
            });
        };
        
        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: 'app/views/maintenance/status/add.html',
            scope: modalScope
        });
    }

    //Desc:       Function to edit statusService
    $scope.status = {};
    $scope.editStatus = function displayModal(data) {
        $scope.status = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateStatus = function () {
            statusService.updateStatus(modalScope.status).then(function (response) {

                //tell all listening to refresh
                hubsr.server.joinhub('StatusScreen', 'true');

                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/maintenance/status/edit.html',
            scope: modalScope
        });
    }

    //Get Status Types
    statusTypeService.getStatusType().then(function (response) {

        $scope.StatusTypes = response.data;;
       
    });

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