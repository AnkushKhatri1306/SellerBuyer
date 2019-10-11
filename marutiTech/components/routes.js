var app = angular.module('myApp', ['ui.router', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    console.log('here');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/static/partials/home-page.html',
        controller: 'mainCtrl'
    });

    $stateProvider.state('about', {
        url: '/view/:name',
        templateUrl:  '/static/partials/seller-buyer.html',
        controller: 'buyerSellerCtrl'
    });

});

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';}
]);
