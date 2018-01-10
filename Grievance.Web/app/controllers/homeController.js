'use strict';
app.controller('homeController', ['$rootScope', '$scope', 'homeService', 'authService', function ($rootScope, $scope, homeService, authService) {

    $scope.authentication = authService.authentication;
    $rootScope.userRole = $scope.authentication.userRole;

    $scope.getProductStatuses = {};

    $scope.dateFilter = {
        dateReturn: '',
        dateFrom: '',
        dateTo: ''
    };
    
    $scope.getCurrentMonthData = function () {
        homeService.getDashboardData().then(function (response) {
          
            $scope.getProductStatuses = response.data;
            $scope.dateFilter.dateReturn = null;
        });
    }

    // Display current month dashboard
    $scope.getCurrentMonthData();

    $(function () {
        $scope.start = new Date();
        $scope.startMonth = $scope.start;
    });

    $scope.displayDate = new Date();
    $scope.noStatuses = false;
    $(function () {
        $('input[name="datefilter"]').daterangepicker({
            "linkedCalendars": false,
            autoUpdateInput: false,
            format: 'dd/mm/yyyy',
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            $scope.dateFilter.dateFrom = picker.startDate.format('MM/DD/YYYY');
            $scope.dateFilter.dateTo = picker.endDate.format('MM/DD/YYYY');
            $scope.dateFilter.dateReturn = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY');
            $scope.displayDate = 'date range selected ' + $scope.dateFilter.dateReturn;
            $scope.getStatusesByDateFilter();
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

    });

    //Get Dashboard By Date Filter 
    $scope.getStatusesByDateFilter = function () {
        homeService.getDashboardDataByDate($scope.dateFilter.dateFrom, $scope.dateFilter.dateTo).then(function (response) {
            $scope.getProductStatuses = response.data;
            $scope.Data = response.data;
            if (response.data.length == 0) {
                $scope.noStatuses = true;
            }
            else {
                $scope.noStatuses = false;
            }
        },
        function (error) {
            console.log('Error on dashboard statuses: ' + error.data.message);
        });
    }
   
}]);