app.controller('reasonCodeController', ['$scope', '$filter', 'reasonCodeService', 'uiGridConstants', '$uibModal',  function ($scope, $filter, reasonCodeService, uiGridConstants, $uibModal) {


  
    $scope.grdReasonCode = {};

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdReasonCode = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'ReasonCode_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Reason Code", style: 'headerStyle', alignment: 'center' },
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
                    '<button type="button" ng-click="grid.appScope.editReasonCode(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

    reasonCodeService.getReasonCode().then(function (response) {
        $scope.grdReasonCode.data = response.data;
        $scope.Data = response.data;
           },
    function (error) {
        alert('Error on Reason Code: ' + error.data.message);
    });

    $scope.toggleFiltering = function () {
        $scope.grdReasonCode.enableFiltering = !$scope.grdReasonCode.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
       
    };

    //Desc:     Function to add new reasonCode to Database
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.reasonCode = {
            Id: 0,
            Code: '',
            Description: '',
            CreatedDate: '',
            CreatedBy: '',
            UpdatedBy: '',
            UpdatedDate: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.saveReasonCode = function () {
          
            reasonCodeService.addReasonCode(modalScope.reasonCode).then(function (response) {
                $scope.grdReasonCode.data.splice(0, 0, {
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
            //controller: 'reasonCodeController',
            size: 'md',
            templateUrl: 'app/views/maintenance/reasonCode/add.html',
            scope: modalScope
        });

    }

    //Desc:       Function to edit reasonCode
    $scope.reasonCode = {};
    $scope.editReasonCode = function displayModal(data) {
        $scope.reasonCode = data;
        var modalScope = $scope.$new();
        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        modalScope.updateReasonCode = function () {
            reasonCodeService.updateReasonCode(modalScope.reasonCode).then(function (response) {
                modalScope.closeModal();
            });
        }

        modalScope.modalInstance = $uibModal.open({
            //controller: 'reasonCodeController',
            size: 'md',
            templateUrl: '/app/views/maintenance/reasonCode/edit.html',
            scope: modalScope
        });
    }

    //Global search function
    $scope.refreshData = function (termObj) {
        $scope.grdReasonCode.data = $scope.Data;
        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.grdReasonCode.data = $filter('filter')($scope.grdReasonCode.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    };
 
}]);