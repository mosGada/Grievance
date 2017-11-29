'use strict';
app.controller("tankerController", ['$scope', 'tankerService', 'authService', 'ngRoles', function ($scope, tankerService, authService, ngRoles) {
    $scope.userRole = authService.authentication.userRole;
    $scope.ngRoles = ngRoles;
    $scope.tankers = []; 

    $scope.getTankers = function (userRole) {
        switch (userRole) {
            case 'Fleet Controller':
                tankerService.getByTransporter().then(function (response) {
                    $scope.tankers = response.data;
                    
                });
                break;
            default:
                //get tankers for the assigned orders with status
                tankerService.getAllAssined().then(function (response) {
                    $scope.tankers = response.data;

                });
                break;
        };
       
    };
    $scope.getTankers($scope.userRole);

    $scope.updateTanker = function (index, productId) {
        
        var tankerProduct = $scope.getRowIndex(productId);
       
        tankerService.update(tankerProduct).then(function (response) {
         
        });
    };

   
    var i;
    $scope.getRowIndex = function (id) {
        var tankerProduct;
        var k = -1;
        for (var j = 0; j < id; j++) {

            for (i = 0; i < $scope.tankers.companies[j].products.length; i++) {
          
                    if ($scope.tankers.companies[j].products[i].id === id) {
                        k = i;
                        tankerProduct = $scope.tankers.companies[j].products[i];
                        break;
                    }
            };
            if (k >= 0) {
                break;
            }
            i = 0;
        }
     
        return tankerProduct;
    };
}]);
