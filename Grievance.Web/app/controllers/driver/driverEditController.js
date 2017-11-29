'use strict';
app.controller('driverEditController', ['$scope', 'companyService', 'authService', '$uibModalInstance', function ($scope, companyService,authService, $uibModalInstance) {

    $scope.userRole = authService.authentication.userRole;

    $scope.isFleet = false;

    $scope.setAccess = function (userRole) {
        switch (userRole) {
            case 'Logistics Controller':
                $scope.isLogistics = true;
                break;
            case 'Transport Controller':
                $scope.isTransport = true;
                break;
            case 'Fleet Controller':
                $scope.isFleet = true;
            case 'Administrator':
                $scope.isAdmin = true;
            default:
        }
    };

    $scope.setAccess($scope.userRole);



    companyService.getTransporters().then(function (response) {      
        $scope.Transpoters = response.data;
    });

}]);