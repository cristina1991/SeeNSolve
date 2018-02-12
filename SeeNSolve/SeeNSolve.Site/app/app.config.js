(function () {
    'use strict';

    angular.module('app')
        .constant('appSettings', {
            apiPath: 'http://localhost:65011/'
        })
        .config([
            '$urlRouterProvider', '$stateProvider', '$httpProvider', '$locationProvider',
            function ($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'app/components/home/home.html',
                        controller: 'HomeController'
                    });
            }
        ]);
})();

