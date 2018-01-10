'use strict';
app.factory('issuesService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/ticketIssues/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var issuesServiceFactory = {};

    var _getAll = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _addIssues = function (issue) {
        return $http.post(serviceBase + apiRoute + 'Add', issue).then(function (response) {
            return response;
        });
    };

    var _updateIssues = function (issue) {

        return $http.put(serviceBase + apiRoute + 'Update', issue).then(function (response) {
            return response;
        });
    };

    issuesServiceFactory.getAll = _getAll;
    issuesServiceFactory.addIssues = _addIssues;
    issuesServiceFactory.updateIssues = _updateIssues;

    return issuesServiceFactory;
}]);