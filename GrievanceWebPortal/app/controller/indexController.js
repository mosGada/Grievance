'use strict';
app.controller('indexController', ['$scope', '$location', function ($scope,$location) {

     
    $scope.logOut = function () {
        //authService.logOut();
        debugger;
        $location.path('/login');
    }

    // $scope.authentication = authService.authentication;
    // $scope.ngRoles = ngRoles;

    // $rootScope.userRole = $scope.authentication.userRole;

}]);