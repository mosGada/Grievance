
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.grid', 'ui.grid.edit', 'ui.grid.exporter', 'ui.grid.grouping', 'ui.grid.autoResize', 'chart.js', 'ui.bootstrap', 'ngMessages', 'angular.filter', 'dx']);
app.config(function ($routeProvider, $locationProvider) {

    
    $routeProvider.when("/statusType", {
        controller: "statusTypeController",
        templateUrl: "/app/views/maintenance/statusType/index.html"
    });

    $routeProvider.when("/status", {
        controller: "statusController",
        templateUrl: "/app/views/maintenance/status/index.html"
    });

    $routeProvider.when("/dashboard", {
        controller: "dashboardController",
        templateUrl: "/app/views/dashboard/dashboardChart.html"
    });

    $routeProvider.when("/construction", {
        controller: "underConstruction/underConstructionController",
        templateUrl: "/app/views/underConstruction/underConstruction.html"
    });

    $routeProvider.when("/tickets", {
        controller: "ticketsController",
        templateUrl: "/app/views/tickets/active.html"
    }); 

    $routeProvider.when("/logticket", {
        controller: "ticketsController",
        templateUrl: "/app/views/tickets/logticket.html"
    });

    $routeProvider.when("/completed", {
        controller: "ticketsCompletedController",
        templateUrl: "/app/views/tickets/completed.html"
    });
   
    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/users", {
        controller: "accountController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/roleDefinition", {
        controller: "roleDefinitionController",
        templateUrl: "/app/views/maintenance/roleDefinition/index.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });


    $routeProvider.otherwise({ redirectTo: "/login" });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

//Local
var serviceBase = 'http://localhost:55638/';

//Live
//var serviceBase = 'http://grievanceapi.azurewebsites.net/';

//var signalrBase = serviceBase + 'signalr/hubs';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});


app.constant('ngRoles', {
    admin: 'Administrator'
});

app.constant('ngStatus', {
    _new: 'New',
    resolved: 'Resolved',
    escalated: 'Escalated',
    assigned: 'Assigned',
});

//app.constant('signalR', {
//    url: serviceBase + 'signalr/hubs',
//    clientHub: 'clientHub'
//});


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', '$rootScope', '$location', function (authService, $rootScope, $location) {
    authService.fillAuthData();

    //Check user logon status
    //$rootScope.$on('$routeChangeStart', function (event, nextLoc, currentLoc) {
    //    if (authService.authentication.isAuth) {            
    //        if (nextLoc.$$route.templateUrl != 'undefined' && nextLoc.$$route.templateUrl != "/app/views/login.html") {
    //            $location.path(nextLoc.$$route.originalPath);
    //        }
    //    }
    //    else {
    //        $location.path("/login");
    //    }
    //});    
}]);


