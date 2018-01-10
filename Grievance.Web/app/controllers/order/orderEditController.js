'use strict';
app.controller('orderEditController', ['$scope', 'ordersService', 'deliveryTypeService', 'productService', 'customerService', 'companyService', 'driverService', 'authService', '$uibModalInstance', function ($scope, ordersService, deliveryTypeService, productService, customerService, companyService, driverService, authService, $uibModalInstance) {
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
                break;
            default:
                $scope.isAdmin = true;
                break;
        };
    };

    $scope.setAccess($scope.userRole);

    $scope.DeliveryTypes = [];
    $scope.Products = [];
    $scope.Customers = [];
    $scope.Transpoters = [];
    $scope.Drivers = [];

    deliveryTypeService.getDeliveryType().then(function (response) {
        $scope.DeliveryTypes = response.data;
    });

    customerService.getCustomers().then(function (response) {
        $scope.Customers = response.data;
    });

    companyService.getTransporters().then(function (response) {
        $scope.Transpoters = response.data;
    });

    productService.getProducts().then(function (response) {
        $scope.Products = response.data;
    });

    $scope.getDrivers = function (userRole) {
        switch (userRole) {
            case 'Fleet Controller':
                driverService.getByTransporter().then(function (response) {
                    $scope.Drivers = response.data;
                });
                break;
            default:
                driverService.getAvailable().then(function (response) {
                    $scope.Drivers = response.data;
                });
        };
    };

    $scope.getDrivers($scope.userRole);
}]);

