var vladApp=angular.module('myApp',['ngRoute']);
vladApp.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl: '/../layout/home.html', controller: 'HomeController'})
});