(function () {
  'use strict';

  angular.module('geocomplete-demo', [ 'geocomplete' ])
    .controller('MainController', function ($scope, geoComplete) {
      $scope.model = {
        city: 'Lake Mary'
      };

      $scope.search = function () {
        geoComplete.cities($scope.model.city).then(function (cities) {
          $scope.model.citiesArray = cities;
        });

        geoComplete.citiesJSON($scope.model.city).then(function (cities) {
          $scope.model.citiesJSON = cities;
        });
      };
    });
})();
