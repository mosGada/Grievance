'use strict';
app.factory('categoryService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketCategory/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var categoryServiceFactory = {};

    var _getAll = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addCategory = function (category) {
        return $http.post(serviceBase + apiRoute + 'Add', category).then(function (response) {
            return response;
        });
    };

    var _updateCategory = function (category) {

        return $http.put(serviceBase + apiRoute + 'Update', category).then(function (response) {
            return response;
        });
    };

    categoryServiceFactory.getAll = _getAll;
    categoryServiceFactory.addCategory = _addCategory;
    categoryServiceFactory.updateCategory = _updateCategory;

    return categoryServiceFactory;
}]);