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
  ])
  .config(demo.app.MainConfig)
  .controller('demo.app.MainCtrl', demo.app.MainCtrl);






/**
 * Main Config
 * @param  {ui.router.$stateProvider=} $stateProvider
 * @param  {ui.router.$urlRouterProvider=} $urlRouterProvider
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



/**
 * Main controller
 * @param  {angular.Scope=} $scope
 * @constructor
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

