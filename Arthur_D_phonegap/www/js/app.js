// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var Planetapp = angular.module('Planetapp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope,$location) {

  $rootScope.goHome = function(){
      //You can access this route anywhere in the application as it is in the rootScope
      $location.path('/list');
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

Planetapp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/list',
    {
      controller: 'ListController',
      templateUrl: 'partials/list.html'
    })
    .when('/details/:selectedPlanet',{
      controller: 'DetailsController',
      templateUrl: 'partials/details.html'
    })
    .otherwise({redirectTo: '/list'});
}]);

Planetapp.controller('ListController', function($scope, $http, $ionicLoading){
$scope.loadPlanet =function(){
  $ionicLoading.show(); //start spinner
  $http.get("http://swapi.co/api/planets/?format=json&page=1") //request for the API
  .success(function(response){
    console.log(response);

    $scope.planets = response.results;
    console.log($scope.planets);
    $scope.planetImagery = response.results;

    console.log($scope.planetImagery);

    $ionicLoading.hide(); //hides the ionic loader
  })
  .finally(function(){
    $scope.$broadcast('scroll.refreshComplete');
  });
};

$scope.loadPlanet();
});

Planetapp.controller('DetailsController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams){

  $ionicLoading.show();
  //console.log($routeParams.itemId)

  $http.get("http://swapi.co/api/planets/?format=json&page=1")
  .success(function(response){
    $scope.planetaryInfo = response.results[$routeParams.selectedPlanet];

    $scope.planetaryResidents = response.results[$routeParams.selectedPlanet];
    
    // $scope.planetFilms = response.results[$routeParams.selectedPlanet];

    $ionicLoading.hide();
  });

}]);
