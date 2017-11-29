'use strict';
app.factory('homeService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var homeServiceFactory = {};
    var dashboardApi = 'api/dashboard/';
    
    var _getProductByMonth = function () {
        return $http.get(serviceBase + dashboardApi + 'GetProductData').then(function (response) {
            return response;
        });
    }

    var _getDashboardData = function () {
        return $http.get(serviceBase + dashboardApi + 'GetStatuses').then(function (response) {
            return response;
        });
    }

    var _getDashboardDataByDate = function (dateFrom, dateTo) {
        return $http.get(serviceBase + dashboardApi + 'GetStatusesByDate?dateFrom=' + dateFrom + '&dateTo=' + dateTo).then(function (response) {
            return response;
        });
    }
    
    homeServiceFactory.getDashboardData = _getDashboardData;
    homeServiceFactory.getDashboardDataByDate = _getDashboardDataByDate;
    homeServiceFactory.getProductByMonth = _getProductByMonth;

    return homeServiceFactory;
}]);