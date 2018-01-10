'use strict';
app.controller('orderDeliveryActionController', ['$scope', 'ordersService', '$uibModalInstance', function ($scope, ordersService, $uibModalInstance) {
   
    $scope.deliveryAction = {};
    var orderId = $scope.order.id;
    $scope.noStatuses = false

    ordersService.getDeliveryActionsStatus(orderId).then(function (response) {
        if (response.data.length != 0) {
            $scope.deliveryAction = response.data;
        } else {
            $scope.noStatuses = true
        }
        
    });
}]);

