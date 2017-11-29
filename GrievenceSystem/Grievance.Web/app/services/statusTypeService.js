'use strict';
app.factory('statusTypeService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/tickets/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var statusTypeServiceFactory = {};

    var _getStatusType = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addStatusType = function (statusType) {
        return $http.post(serviceBase + apiRoute + 'Add', statusType).then(function (response) {
            return response;
        });
    };

    var _updateStatusType = function (statusType) {
        return $http.put(serviceBase + apiRoute + 'Update', statusType).then(function (response) {
            return response;
        });
    };

    statusTypeServiceFactory.getStatusType = _getStatusType;
    statusTypeServiceFactory.addStatusType = _addStatusType;
    statusTypeServiceFactory.updateStatusType = _updateStatusType;

    return statusTypeServiceFactory;
}]);