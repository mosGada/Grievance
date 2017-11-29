'use strict';
app.controller("ticketOwnerController", ['$scope', '$filter', 'ticketsService', 'uiGridConstants', '$uibModal', function ($scope, $filter, ticketsService, uiGridConstants, $uibModal) {


    $scope.grdTickets = {};
    $scope.filterOptions = {
        filterText: ''
    };

    $scope.grdTickets = {
        enableSelectAll: true,
        enableSorting: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        editDropdownOptionsArray: true,
        enableGridMenu: true,
        enableFiltering: false, exporterCsvFilename: 'ActiveTickets_Export_' + new Date() + '.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Actice Tickets", style: 'headerStyle', alignment: 'center' },
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
            { field: 'Name', displayName: 'Name', enableCellEdit: false },
              { field: 'Description', displayName: 'Description', enableCellEdit: false, cellFilter: 'date:\'yyyy/MM/dd\'', enableFiltering: true },
              { field: 'Remarks', displayName: 'Remarks', enableCellEdit: false },

            {
                name: "Actions",
                field: "Savebutton",
                cellTemplate:
                    '<button type="button" ng-click="grid.appScope.editStatusType(row.entity)" class="btn btn-default" aria-label="Left Align">' +
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

//    ticketsService.getTickets().then(function (response) {
//        $scope.grdTickets.data = response.data;
//        $scope.Data = response.data;

//    },
//function (error) {
//    console.log('Error on Status Type: ' + error.data.message);
    //});

    $scope.ticketOwner = {
        name: "",
        surname: "",
        idNumber: "",
        contactNumber: "",
        AlternativeNumber: "",
        emailAddress: "",
        physicalAddress: "",
        latitude: "",
        longitude: ""
    }

    $scope.saveTicketOwner = function () {

        ticketsService.addTicketOwner($scope.ticketOwner).then(function (response) {
        },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     $scope.message = "Failed to register ticket owner due to:" + errors.join(' ');
                 });
    };

    //function to add new status type
    //function to add new status type
    $scope.addNew = function () {
        var modalScope = $scope.$new();
        modalScope.tickets = {
            id: 0,
            name: '',
            description: '',
            remarks: '',
            ticketOwnerId: 0,
            grievanceTypeId: '',
            departmentId: '',
            ticketStatusId: '',
            ticketPriorityId: '',
            referenceNumber: '',
            userId: ''
        };

        modalScope.ParentScope = $scope;
        modalScope.closeModal = function () {
            modalScope.modalInstance.close();
        }

        $scope.saveTicketOwner();

        modalScope.saveTickets = function () {
            ticketsService.addTickets(modalScope.tickets).then(function (response) {
                $scope.grdTickets.data.splice(0, 0, {
                    //createdDate: response.data.createdDate,
                    //createdBy: response.data.createdBy,
                    name: response.data.name,
                    description: response.data.description,
                    remarks: response.data.remarks,
                    ticketPriorityId: response.data.ticketOwner,
                    grievanceTypeId: response.data.grievanceTypeId,
                    ticketOwnerId: response.data.ticketOwnerId,
                    departmentId: response.data.departmentId
                    //updatedBy: response.data.updatedBy,
                    //updatedDate: response.data.updatedDate
                });
                modalScope.closeModal();
            });
        };

        modalScope.modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: '/app/views/tickets/add.html',
            scope: modalScope
        });

    };


    //$scope.addNew = function () {
    //    var modalScope = $scope.$new();
    //    modalScope.tickets = {
    //        Id: 0,
    //        Name: '',
    //        Description: '',
    //        Remarks: ''
    //    };

    //    modalScope.ParentScope = $scope;
    //    modalScope.closeModal = function () {
    //        modalScope.modalInstance.close();
    //    }
    //    $scope.ticketOwner = {
    //        name: "",
    //        surname: "",
    //        idNumber: "",
    //        contactNumber: "",
    //        AlternativeNumber: "",
    //        emailAddress: "",
    //        physicalAddress: "",
    //        latitude: "",
    //        longitude: ""
    //    }

    //    //$scope.saveTicketOwner = function () {

    //        ticketsService.addTicketOwner($scope.ticketOwner).then(function (response) {
    //        },
    //                 function (response) {
    //                     var errors = [];
    //                     for (var key in response.data.modelState) {
    //                         for (var i = 0; i < response.data.modelState[key].length; i++) {
    //                             errors.push(response.data.modelState[key][i]);
    //                         }
    //                     }
    //                     $scope.message = "Failed to register ticket owner due to:" + errors.join(' ');
    //                 });
    //    //};

    //    modalScope.saveTickets = function () {
    //        ticketsService.addTickets(modalScope.tickets).then(function (response) {
    //            $scope.grdTickets.data.splice(0, 0, {
    //                //createdDate: response.data.createdDate,
    //                //createdBy: response.data.createdBy,
    //                Name: response.data.Name,
    //                Description: response.data.Description,
    //                Remarks: response.data.Remarks,
    //                //updatedBy: response.data.updatedBy,
    //                //updatedDate: response.data.updatedDate
    //            });
    //            modalScope.closeModal();
    //        });
    //    };

    //    modalScope.modalInstance = $uibModal.open({
    //        size: 'md',
    //        templateUrl: '/app/views/tickets/add.html',
    //        scope: modalScope
    //    });

    //};

}]);