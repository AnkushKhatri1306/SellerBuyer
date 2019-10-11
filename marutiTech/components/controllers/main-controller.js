var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $location, $cookies, $stateParams, dataService){
    console.log('mainCtrl');

    $scope.login = function(name){
        $cookies.put('type', name);
        $location.path('view/'+name);
    }
    $scope.checkLoginStatus = function(){
        if($cookies.get('type'))
        {
            $location.path('view/'+ $cookies.get('type'));
        }
    }
    $scope.checkLoginStatus();
});