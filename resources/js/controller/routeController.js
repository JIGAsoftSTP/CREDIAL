/**
 * Created by Helcio on 2/18/2017.
 */

var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'secondFile.php',
      });
});

// mainApp.controller('reportController', function ($scope) {
//
//     console.info("entrou");
// });