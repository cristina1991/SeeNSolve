(function () {
    'use strict';

    angular.module('app').controller('HomeController', function ($scope, $state,
        photoService, $window, store) {
        $scope.arrayToSearchWehkamp = [];
        $scope.baseHiperlink = "https://www.wehkamp.nl/Winkelen/Search.aspx?Ntt=";
        $scope.isMainTagPresent = false;
        $scope.initHomeCtrl = function () {

            $scope.searchTags = function () {
                $scope.hipelink = "";
                $scope.arrayToSearchWehkamp = [];
                var file = document.getElementById("fileUpload").files[0];
                $scope.promise = photoService.upload(file).then(function (response) {
                    $scope.jsonResponse = response.data;
                    //$scope.arrayToSearchWehkamp.push($scope.jsonResponse.bestMatch[0]);
                    if (file.name) {
                        $scope.isFileUploaded = true;
                        var fileBase64 = $scope.myfile.base64;
                        $scope.uploadedFile = "data:image/png;base64," + fileBase64;
                        $scope.isMainTagPresent = true;
                    }
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