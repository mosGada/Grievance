'use strict';
app.factory('departmentService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/department/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var departmentServiceFactory = {};

    var _getAll = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addDepartment = function (department) {
        return $http.post(serviceBase + apiRoute + 'Add', department).then(function (response) {
            return response;
        });
    };

    var _updateDepartment = function (department) {

        return $http.put(serviceBase + apiRoute + 'Update', department).then(function (response) {
            return response;
        });
    };

    departmentServiceFactory.getAll = _getAll;
    departmentServiceFactory.addDepartment = _addDepartment;
    departmentServiceFactory.updateDepartment = _updateDepartment;

    return departmentServiceFactory;
}]);