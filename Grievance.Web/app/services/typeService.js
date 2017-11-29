'use strict';
app.factory('typeService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketType/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var typeServiceFactory = {};

    var _getAll = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addType = function (type) {
        return $http.post(serviceBase + apiRoute + 'Add', type).then(function (response) {
            return response;
        });
    };

    var _updateType = function (type) {

        return $http.put(serviceBase + apiRoute + 'Update', type).then(function (response) {
            return response;
        });
    };

    typeServiceFactory.getAll = _getAll;
    typeServiceFactory.addType = _addType;
    typeServiceFactory.updateType = _updateType;

    return typeServiceFactory;
}]);