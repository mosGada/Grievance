'use strict';
app.controller('orderDeleteController', ['$scope', 'ordersService', 'reasonCodeService', 'authService', '$uibModalInstance', function ($scope, ordersService, reasonCodeService, authService, $uibModalInstance) {
    $scope.userRole = authService.authentication.userRole;
    $scope.isLogistics = false;
    $scope.isTransport = false;
    $scope.isFleet = false;
    $scope.isAdmin = false;

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

    $scope.reasonCodes = [];
    reasonCodeService.getReasonCode().then(function (response) {
     
        $scope.reasonCodes = response.data;
    });

    
}]);

