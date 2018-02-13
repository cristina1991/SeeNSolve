(function () {
    'use strict';

    angular.module('app').controller('HomeController', function ($scope, $state, photoService, $window) {
        $scope.arrayToSearchWehkamp = [];
        $scope.baseHiperlink = "https://www.wehkamp.nl/Winkelen/Search.aspx?Ntt=";
        
        $scope.initHomeCtrl = function () {

            $scope.searchTags = function () {
                var file = document.getElementById("fileUpload").files[0];
                photoService.upload(file).then(function (response) {
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