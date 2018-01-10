'use strict';
app.factory('ownerService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketOwner/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var ownerServiceFactory = {};

    var _getById = function (id) {
        return $http.get(serviceBase + apiRoute + 'getByID?id=' + id).then(function (response) {
            return response;
        });
    };

    ownerServiceFactory.getById = _getById;

    return ownerServiceFactory;
}]);