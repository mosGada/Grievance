'use strict';
app.factory('remarksService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketRemark/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var remarkServiceFactory = {};

    var _getById = function (remark) {
        return $http.get(serviceBase + apiRoute + 'GetRemarksByTicketId?ticketId=' + remark).then(function (response) {
            return response;
        });
    };

    var _addRemark = function (remark) {
        return $http.post(serviceBase + apiRoute + 'AddRemark', remark).then(function (response) {
            return response;
        });
    };

    var _updateRemark = function (remark) {

        return $http.put(serviceBase + apiRoute + 'Update', remark).then(function (response) {
            return response;
        });
    };

    remarkServiceFactory.getById = _getById;
    remarkServiceFactory.addRemark = _addRemark;
    remarkServiceFactory.updateRemark = _updateRemark;

    return remarkServiceFactory;
}]);