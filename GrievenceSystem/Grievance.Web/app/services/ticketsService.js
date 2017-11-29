'use strict';
app.factory('ticketsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var apiRoute = 'api/tickets/';
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var ticketsServiceFactory = {};

    var _getTickets = function () {
        return $http.get(serviceBase + apiRoute + 'GetAll').then(function (response) {
            return response;
        });
    };

    var _getTicketOwner = function () {
        return $http.get(serviceBase + apiRoute + 'GetTicketOwner').then(function (response) {
            return response;
        });
    };

    var _addTickets = function (tickets) {
        return $http.post(serviceBase + apiRoute + 'Add', tickets).then(function (response) {
            return response;
        });
    };

    var _addTicketRemarks = function (tickets) {
        return $http.post(serviceBase + apiRoute + 'AddRemarks', tickets).then(function (response) {
            return response;
        });
    };

    var _addTicketOwners = function (tickets) {
        return $http.post(serviceBase + apiRoute + 'AddOwners', tickets).then(function (response) {
            return response;
        });
    };

    var _updateTicket = function (tickets) {
        return $http.post(serviceBase + apiRoute + 'Update', tickets).then(function (response) {
            return response;
        });
    };

    ticketsServiceFactory.getTickets = _getTickets;
    ticketsServiceFactory.addTickets = _addTickets;
    ticketsServiceFactory.updateTicket = _updateTicket;
    ticketsServiceFactory.addTicketRemarks = _addTicketRemarks;
    ticketsServiceFactory.addTicketOwners = _addTicketOwners; 
    ticketsServiceFactory.getTicketOwner = _getTicketOwner;

    return ticketsServiceFactory;
}]);