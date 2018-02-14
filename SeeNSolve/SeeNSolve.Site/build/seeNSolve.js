(function () {
    'use strict';

    angular.module('app', [
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'cgBusy'
    ]);
})();
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


(function () {
    'use strict';

    angular.module('app').factory('PhotoResource', function ($resource, appSettings) {
        return $resource(appSettings.apiPath,
            {
                'get': { method: 'GET' },
                'post': {
                    method: 'post',
                    isArray: true
                }
            });

    });
})();
(function () {
    'use strict';

    angular.module('app').factory('photoService', function (PhotoResource, $http) {
        var photoService = {};
        photoService.upload = function (photo) {
            var url = "https://self-service-invoice-service.trusted.nl.wehkamp.dev.blaze.ps/image/upload";
            var fd = new FormData();
            fd.append('file', photo);

            //sample data
            var data = {
                file: photo
            };

            fd.append("data", JSON.stringify(data));
            return $http.post(url, fd, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            });
           
        };
        return photoService;
    });

})();
(function () {
    'use strict';

    angular.module('app').controller('HomeController', function ($scope, $state, photoService, $window) {
        $scope.arrayToSearchWehkamp = [];
        $scope.baseHiperlink = "https://www.wehkamp.nl/Winkelen/Search.aspx?Ntt=";
        
        $scope.initHomeCtrl = function () {

            $scope.searchTags = function () {
                $scope.hipelink = "";
                $scope.arrayToSearchWehkamp = [];
                var file = document.getElementById("fileUpload").files[0];
                $scope.promise = photoService.upload(file).then(function (response) {
                    $scope.mainTag = response.data.splice(0,1)[0];
                    $scope.expectedTags = response.data ;
                }); 
            };
           
            $scope.addSearch = function (tagName) {
                var concatString = "";
                var index = $scope.arrayToSearchWehkamp.indexOf(tagName);
                if (index > -1) {
                    $scope.arrayToSearchWehkamp.splice(index, 1);
                } else {
                    $scope.arrayToSearchWehkamp.push(tagName);
                }
                angular.forEach($scope.arrayToSearchWehkamp,function (element, index) {
                    concatString += element + "%20";
                });
                $scope.hipelink = $scope.baseHiperlink + concatString;
            };

            $scope.searchWehkamp = function () {
                $window.open($scope.hipelink, '_blank');
            };

        };
    });
})();