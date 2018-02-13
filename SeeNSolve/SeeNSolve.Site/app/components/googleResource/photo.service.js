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