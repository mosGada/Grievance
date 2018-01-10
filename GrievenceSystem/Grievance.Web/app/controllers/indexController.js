'use strict';
app.controller('indexController', ['$scope', '$rootScope', '$location', 'authService', 'ngRoles', function ($scope,$rootScope, $location, authService, ngRoles) {

     
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/login');
    }

    $scope.authentication = authService.authentication;
    $scope.ngRoles = ngRoles;

    $rootScope.userRole = $scope.authentication.userRole;

}]);