(function () {
    'use strict';

    angular.module('app')
        .constant('appSettings', {
            apiPath: 'https://self-service-invoice-service.trusted.nl.wehkamp.dev.blaze.ps/image/'
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

