/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app');


/** 
 * @type {angular.Module} 
 **/
demo.app = angular.module('demo.app', [
  'ngRoute',
  'ui.router'
]);


/**
 * Main Config
 * @param  {!ui.router.$stateProvider} $stateProvider
 * @param  {!ui.router.$urlRouterProvider} $urlRouterProvider
 * @constructor
 * @export
 * @ngInject
 */
demo.app.MainConfig = function ($stateProvider, $urlRouterProvider) {
  console.log('cfg');

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: "/",
      views: {
        '': {
          controller: 'demo.app.MainCtrl',
          templateUrl: 'views/main.html'
        }
      }
    })
};

demo.app.config(demo.app.MainConfig);


/**
 * Main controller
 * @param  {angular.Scope=} $scope
 * @constructor
 * @export
 * @ngInject
 */
demo.app.MainCtrl = function($scope) {
  console.log('ctrl');
  /**
   * @type {string}
   * @export
   */
  $scope.message = 'Hello World';
};

demo.app.controller('demo.app.MainCtrl', demo.app.MainCtrl)
