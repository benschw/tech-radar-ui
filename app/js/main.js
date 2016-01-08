/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app');


/** 
 * @type {angular.Module} 
 **/
demo.app = angular.module('demo.app', [
  'ngRoute',
  'ui.router',
  'ui.bootstrap'
]);






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
  var root = {
      url: "",
      'abstract': true,
      views: {
        '': {
          templateUrl: 'views/root.html'
        }
      }
  };
  var home = {
      url: "/",
      'parent': root,
      views: {

        'main': {
          controller: 'demo.app.MainCtrl',
          templateUrl: 'views/home.html'
        },
        'header' : {
          templateUrl: 'views/header.html'
        },
        'left' : {
          templateUrl: 'views/left.html'
        },
      }
  };
  $stateProvider
    .state('root', root)
    .state('home', home);
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

demo.app
  .config(demo.app.MainConfig)
  .controller('demo.app.MainCtrl', demo.app.MainCtrl);
