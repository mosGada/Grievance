'use strict';
app.factory('statusService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketStatus/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var statusServiceFactory = {};

    var _getStatus = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addStatus = function (status) {
        return $http.post(serviceBase + apiRoute + 'Add', status).then(function (response) {
            return response;
        });
    };

    var _updateStatus = function (status) {
     
        return $http.put(serviceBase + apiRoute + 'Update', status).then(function (response) {
            return response;
        });
    };

    statusServiceFactory.getStatus = _getStatus;
    statusServiceFactory.addStatus = _addStatus;
    statusServiceFactory.updateStatus = _updateStatus;

    return statusServiceFactory;
}]);