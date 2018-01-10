'use strict';
app.factory('priorityService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketPriority/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var priorityServiceFactory = {};

    var _getAll = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addPriority = function (priority) {
        return $http.post(serviceBase + apiRoute + 'Add', priority).then(function (response) {
            return response;
        });
    };

    var _updatePriority = function (priority) {

        return $http.put(serviceBase + apiRoute + 'Update', priority).then(function (response) {
            return response;
        });
    };

    priorityServiceFactory.getAll = _getAll;
    priorityServiceFactory.addPriority = _addPriority;
    priorityServiceFactory.updatePriority = _updatePriority;

    return priorityServiceFactory;
}]);