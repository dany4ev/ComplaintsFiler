'use strict';

module.exports = directive;

/* @ngInject */
function directive() {
    return {
        restrict: 'AE',
        scope: {
            datalist: '=datalist',
            onPaginationUpdated: '&'
        },
        transclude: true,
        controller: ['$scope', function ($scope) {
            $scope.curPage = $scope.$parent.vm.curPage;
            $scope.pageSize = $scope.$parent.vm.pageSize;
            $scope.next = function () {
                $scope.curPage = $scope.curPage + 1;
                $scope.totalItems = $scope.curPage * $scope.pageSize;                
            };
            $scope.previous = function () {
                $scope.curPage = $scope.curPage - 1;
                $scope.totalItems = $scope.curPage * $scope.pageSize;
            };
            $scope.disablenext = function () {
                return $scope.curPage >= $scope.datalist.length / $scope.pageSize - 1;
            };
            $scope.disablePrevious = function () {
                return $scope.curPage === 0;
            };
        }],
        link: function (scope) {
            scope.$watch('totalItems', function (value) {
                scope.onPaginationUpdated({ directiveData: value });
            });
        },        
        template: ['<div class="pagination pagination-centered" ng-if="datalist.length > 0">',
            '<ul class="pagination-controle pagination">',
            '<li>',
            '<button type="button" class="btn btn-primary" ng-disabled="disablePrevious()" ng-click="previous()"> &lt; PREV</button>',
            '</li>',
            '<li>',
            '<span>Page {{curPage + 1}} of {{ (datalist.length / pageSize) | ceil }}</span>',
            '</li>',
            '<li>',
            '<button type="button" class="btn btn-primary" ng-disabled="disablenext()" ng-click="next()">NEXT &gt;</button>',
            '</li>',
            '</ul>',
            '</div>'].join('')
    };
}