var app = angular.module('myApp');

app.controller('buyerSellerCtrl', function($scope, $location, $cookies, $stateParams, dataService, $interval, $timeout){
    $scope.buyer = false;
    $scope.item = {};
    $scope.item['categories'] = [];
    $scope.category = {};

    if($stateParams.name == 'buyer'){
       $scope.buyer = true;
    }
    /*function for getting the item list and category list */
    $scope.getItemCategoryList = function(){
        dataService.get('/data/list/').then(function(data){
            $scope.itemList = data.item_list;
            $scope.categoriesList = data.category_list;
        });
    }

    /*checking if stateparams is there then calling the function for getting list of category and item*/
    if($stateParams.name)
    {
        $scope.getItemCategoryList();
    }

    /*function for saving the item to db here checking that categories is there or not if not sending warning toaster*/
    $scope.saveItem = function(){
        if($scope.item.categories.length>0)
        {
            dataService.post('/item/save/', $scope.item).then(function(data){
                if(data.status == 'Success')
                {
                    $scope.getItemCategoryList();
                    $scope.generateToaster('success', 'Item save successfully .');
                    $scope.item = {};
                    $scope.item['categories'] = [];
                }
                else{
                    $scope.generateToaster('error', 'Error in saving item data .');
                }
            });
        }
        else
        {
            $scope.generateToaster('warning', 'Please select at least one category .');
        }
    }

    /*function for saving the categroy to db*/
    $scope.saveCategory = function(){
        dataService.post('/category/save', $scope.category).then(function(data){
            if(data.status == 'Success')
            {
                $scope.closeCategory();
                $scope.categoriesList.push($scope.category);
                $scope.generateToaster('success', 'Category save successfully .');
            }
            else{
                $scope.generateToaster('error', 'Error in saving category data .');
            }
        });
    }

    /*function for buyer filter list of items*/
    $scope.getFilterItemList = function(categoriesList)
    {
        if(categoriesList != undefined && categoriesList.length >0)
        {
            $scope.subscribe_categories = angular.copy(categoriesList);
             dataService.get('/category/list/', categoriesList).then(function(data){
                $scope.itemList = data;
            });
        }
    }

    /*for trigerring the slider*/
    $scope.addCategory = function(){
        $scope.category = {};
        $('.add-category-slider').css('right', '0px');
    }

    /*for trigeering the close trigger*/
    $scope.closeCategory = function(){
        $('.add-category-slider').css('right', '-500px');
    }
    /*function for logout and remove cookie*/
    $scope.logout = function(){
        $cookies.remove('type');
        $location.path('/');
    }

    /*here if buyer login then checking for item list updated or not */
    if($scope.buyer)
    {
        $interval(function() {
            $scope.getFilterItemList($scope.subscribe_categories);
        }, 3000)
    }

    /*function for generating the toaster*/
    $scope.generateToaster = function(type, message){
        $scope.toaster = true;
        $scope.toasterMsg = message;
        if(type == 'error')
        {
            $('.toaster').css({'background-color':'#f53333'});
        }
        if(type == 'success')
        {
            $('.toaster').css('background-color', '#61d461');
        }
        if(type == 'warning')
        {
            $('.toaster').css('background-color', '#ff9900de');
        }
        $timeout(function(){
            $scope.toaster = false;
        }, 3000);
    }
});