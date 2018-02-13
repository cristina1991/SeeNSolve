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