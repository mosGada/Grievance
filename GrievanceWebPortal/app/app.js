
var app = angular.module('AngularAuthApp', ['ngRoute']);
app.config(function ($routeProvider) {

    // $routeProvider.when("/home", {
    //     controller: "homeController",
    //     templateUrl: "/app/views/home.html"
    // });



    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/about.html"
    });

    // route for the about page
    routeProvider.when('/about', {
        templateUrl : 'pages/about.html',
        controller  : 'aboutController'
    });

    // route for the contact page
    routeProvider.when('/contact', {
        templateUrl : 'pages/contact.html',
        controller  : 'contactController'
    });



  //  $routeProvider.otherwise({ redirectTo: "/login" });


});

	// create the controller and inject Angular's $scope
	app.controller('loginController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	app.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	app.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});



