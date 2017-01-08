'use strict';

angular.module('currencyConverterApp', ['ngRoute', 'welcome.page'])
    
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/welcome'});
}])
    

