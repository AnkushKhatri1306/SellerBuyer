    var  app = angular.module('myApp');

    app.directive('semanticSelect', ['$timeout', function($timeout) {

        return {
            restrict: 'E',
            require: '?ngModel',
            scope: {
                placeholderText: '@',
                id: '@',
                multiple: '=?',
                ngModel : '=ngModel',
                options: '=',
                optionName: '@',
                optionValue: '@',
                isRequired:'=?',
                timeOut:'@',
                callBack: '=?',
            },

//            templateUrl: '/media/apps/common/widgets/semanticui/partials/widget-semanticui-dropdown.min.html',
            template:'<div class="{{ id }} ui fluid dropdown selection multiple" tabindex="0"><i class="dropdown icon"></i>'+
               '<div class="default text">{{ placeholderText }}</div> <div class="menu" tabindex="-1">'+
               '<div ng-repeat="option in options" data-value="{{ option[optionValue || \'value\'] }}" class="item">'+
            '{{ option[optionName || \'name\'] }} </div></div></div>',

            link: function ($scope, element, attrs, ctrl) {
                if($scope.timeOut == undefined){
                    $scope.timeOut = 5;
                }
                $scope.$watch('ngModel', function () {
                     $timeout( function() {
                         $scope.eleObj = $('.'+ $scope.id +'.ui.selection.dropdown').dropdown();
                            $scope.eleObj.dropdown('setting', 'onChange', function(value, text, $choice){
                                var model_value = value.split(',');
                                if($scope.callBack != undefined)
                                {
                                    $scope.callBack(model_value);
                                }
                                ctrl.$setViewValue(model_value);
                            });
                        $scope.eleObj.dropdown('set selected', $scope.ngModel);
                    }, $scope.timeOut);
                    if($scope.ngModel != undefined)
                    {
                        if($scope.ngModel.length == 0)
                        {
                            $('.'+ $scope.id +'.ui.selection.dropdown').dropdown('clear');
                        }
                    }
                    if($scope.isRequired)
                    {
                        // for add ngModel will be undefined.
                        // in edit if from backend coming empty list
                        // in edit if user is removed all value for multi select, then all 3 cases it should invalid the form
                        if(($scope.ngModel && ($scope.ngModel[0] == "" || $scope.ngModel.length==0)) || $scope.ngModel == undefined) // this condition is checked because when ngModel list will not having data it will have one empty string
                        {
                           ctrl.$setValidity('required', false);  // making required invalid, so that form message will show for required
                        }
                        else
                           ctrl.$setValidity('required', true);
                    }
                });
            }
        }
    }]);