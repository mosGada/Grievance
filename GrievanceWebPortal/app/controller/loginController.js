'use strict';
app.controller('loginController', ['$scope', '$location', function ($scope, $location) {
       

    // authService.logOut();
    // $scope.loginData = {
    //     userName: "",
    //     password: "",
    //     useRefreshTokens: false,
    // };

    // $scope.message = " ";

    $scope.login = function () {
        $location.path('/home');
        // authService.login($scope.loginData).then(function (response) {

        //     $location.path('/home');
        // },
        //  function (err) {
        //      $scope.message = err.data.error_description;
        //  });
    };

}]);
