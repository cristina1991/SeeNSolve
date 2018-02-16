(function () {
    'use strict';

    angular.module('app').controller('HomeController', function ($scope, $state,photoService, $window, store) {
        $scope.arrayToSearchWehkamp = [];
        $scope.isFile = false;
        $scope.isTagPresentInSearch = '';
        $scope.isSearchTagPresent = false;

        $scope.baseHiperlink = "https://www.wehkamp.nl/Winkelen/Search.aspx?Ntt=";
        $scope.initHomeCtrl = function () {
            $scope.searchTags = function () {
                $scope.hipelink = "";
                $scope.arrayToSearchWehkamp = [];
                var file = document.getElementById("fileUpload").files[0];
                $scope.promise = photoService.upload(file).then(function (response) {
                    $scope.jsonResponse = response.data;
                    if (file.name) {
                        $scope.isMainTagPresent = true;
                    }
                }); 
            };
            $scope.fileUploadVerify = function (myFile) {
                if (myFile != null) {
                    $scope.isFile = true;
                    $scope.isFileUploaded = true;
                    var fileBase64 = $scope.myfile.base64;
                    $scope.uploadedFile = "data:image/png;base64," + fileBase64;
                    $scope.jsonResponse = {};
                }
              
            };
            $scope.addSearch = function (tagName) {
                var concatString = "";
                var index = $scope.arrayToSearchWehkamp.indexOf(tagName);
                if (index > -1) {
                    $scope.arrayToSearchWehkamp.splice(index, 1);
                } else {
                    $scope.arrayToSearchWehkamp.push(tagName);
                }
                $scope.choosenTags = $scope.arrayToSearchWehkamp.toString();
                angular.forEach($scope.arrayToSearchWehkamp, function (element, index) {
                   
                    concatString += element + "%20";
                    if (concatString.indexOf(tagName) !== -1) {
                        $scope.isTagPresentInSearch = tagName;
                    }
                });
                $scope.hipelink = $scope.baseHiperlink + concatString;
                if (concatString != '') {
                    console.log("concatString", concatString);
                }
            };

            $scope.searchWehkamp = function () {
                $window.open($scope.hipelink, '_blank');
            };

        };
    });
})();