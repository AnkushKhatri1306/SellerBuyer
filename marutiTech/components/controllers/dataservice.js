var  app = angular.module('myApp');

    app.service('dataService', ['$http', '$q', function($http, $q){
        this.get = function(url, params){
            var deferred = $q.defer();
            console.log('sas',params);
            /*var request = $http.get(url, {params: params});*/
            var request = $http({
                method: "get",
                url: url,
                params: {'data': JSON.stringify(params)}
            });
            request.success(function (data, status, headers, config) {
                deferred.resolve(data);
            });
            request.error(function (data, status) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        this.post = function(url, params){
            var deferred = $q.defer();
            var request = $http({
                method: "post",
                url: url,
                data: JSON.stringify(params)
            });
            request.success(function(data, status, headers, config) {
                deferred.resolve(data)
            });
            request.error(function(response){
                deferred.reject(data);
            });
            return deferred.promise;
        };

        this.delete = function(url, params){
            var deferred = $q.defer();
            var request = $http.delete(url, {params: params});
            request.success(function (data, status, headers, config) {
                deferred.resolve(data);
            });
            request.error(function (data, status) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    }]);