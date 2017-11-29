'use strict';
app.factory('roleDefinitionService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
    var apiroute = 'api/RoleDefinition/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var roleServiceFactory = {};

    var _saveRole = function (registration) {
        return $http.post(serviceBase + apiroute +'register', registration).then(function (response) {
            return response;
        });
    };

    var _getRoles = function () {
        return $http.get(serviceBase + apiroute + 'GetRoles').then(function (response) {
            return response;
        });
    };

    var _getRoleByUser = function (userid) {
        return $http.get(serviceBase + apiroute + 'GetRoles', userid).then(function (response) {
            return response;
        });
    };

    var _getExternalRoles = function () {
        return $http.get(serviceBase + apiroute + 'GetExternal').then(function (response) {
            return response;
        });
    };

    var _getInternalRoles = function () {
        return $http.get(serviceBase + apiroute + 'GetInternal').then(function (response) {
            return response;
        });
    };

    var _update = function (updateRole) {
       
        return $http.post(serviceBase + apiroute + 'updateRole', updateRole).then(function (response) {
            return response;
        });
    };


    roleServiceFactory.saveRole = _saveRole;
    roleServiceFactory.getRoles = _getRoles;
    roleServiceFactory.getRolebyId= _getRoleByUser;
    roleServiceFactory.updateRoleDefinition = _update;
    roleServiceFactory.getInternalRoles = _getInternalRoles;
    roleServiceFactory.getExternalRoles = _getExternalRoles;

    return roleServiceFactory;
}]);