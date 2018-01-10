'use strict';
app.controller('departmentController', ['$scope', 'departmentService', 'authService', '$uibModalInstance', function ($scope, departmentService, authService, $uibModalInstance) {

    $scope.Departments = [];

    departmentService.getAll().then(function (response) {

        $scope.Departments = response.data;
    });



}]);