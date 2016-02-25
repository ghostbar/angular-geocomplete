//
// geocomplete
// ===================
//
(function () {
  'use strict';

  angular.module('geocomplete', [])
    .factory('geoComplete', [ '$http', function ($http) {
      var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

      /* Public API */
      return {
        //
        // <a name='cities'></a>
        // Public: cities
        // --------------------------
        //
        // #### Arguments
        //
        // + `cityName`: `String`
        // + `options`:  (Optional )`Object` of options, see more: https://developers.google.com/maps/documentation/geocoding/intro#ComponentFiltering
        // + `callback`: (Optional) `Callback` function
        //
        // #### Returns
        //
        // An `Array` with a `String` with the name of the City followed by the
        // State and the Country name, separated by commas.
        //
        // #### Example on a REPL:
        //
        // ```
        // $ utils.autocompleteCities("San ");
        // => ["San Diego, CA, United States", "San Andreas, CA, United States", ...]
        // ```
        //
        cities: function (cityName, options, callback) {
          return $http.get(apiUrl, {
            params: angular.extend({}, options, {
              address: cityName,
              sensor: false
            })
          }).then(function (res) {
            var addresses = [];

            angular.forEach(res.data.results, function (item) {
              addresses.push(item.formatted_address)
            });

            if (callback) {
              return callback.call(this, addresses);
            }

            return addresses;
          });
        },

        //
        // <a name='citiesJSON'></a>
        // Public: geocomplete Cities returning a JSON
        // --------------------------------------------
        //
        // Just like autocompleteCities but instead of returning an Array with
        // Strings it returns an Array with a JSON with more details per city.
        //
        // #### Arguments
        //
        // + `cityName`: A `String` with the city/place name
        // + `options`:  (Optional )`Object` of options, see more: https://developers.google.com/maps/documentation/geocoding/intro#ComponentFiltering
        // + `callback`: (Optional) `Callback` function.
        //
        // #### Returns
        //
        // An `Array` with an `Object` with the full response from Google's API:
        //
        // #### Example on REPL:
        //
        // ```
        // $ utils.autocompleteCitiesJSON("San Cristobal");
	      // => [{
	      //   "address_components":[
	      //     {
	      //       "long_name":"San Cristobal",
	      //       "short_name":"San Cristobal",
	      //       "types":["locality","political"]
	      //    }, {
	      //      "long_name":"San Cristobal",
	      //      "short_name":"San Cristobal",
	      //      "types":["administrative_area_level_2","political"]
	      //    }, {
	      //      "long_name":"Táchira",
	      //      "short_name":"Táchira",
	      //      "types":["administrative_area_level_1","political"]
	      //    }, {
	      //      "long_name":"Venezuela",
	      //      "short_name":"VE",
	      //      "types":["country","political"]
	      //    }
	      //  ],
	      //  "formatted_address":"San Cristobal, Venezuela",
	      //  "geometry":{
	      //    "bounds":{
	      //      "northeast":{"lat":7.816616199999999,"lng":-72.19365119999999},
	      //      "southwest":{"lat":7.718986699999999,"lng":-72.2554064}
	      //    },
	      //    "location":{"lat":7.764951000000001,"lng":-72.226061},
	      //    "location_type":"APPROXIMATE",
	      //    "viewport":{"northeast":{"lat":7.816616199999999,"lng":-72.19365119999999},"southwest":{"lat":7.718986699999999,"lng":-72.2554064}}
	      //  },
	      //  "types":["locality","political"]
	      //  }, ...]
        // ```
        //
        citiesJSON: function (cityName, options, callback) {
          return $http.get(apiUrl, {
            params: angular.extend({}, options, {
              address: cityName,
              sensor: false
            })
          }).then(function (res) {
            var addresses = [];

            angular.forEach(res.data.results, function (item) {
              addresses.push(item);
            });

            if (callback) {
              return callback.call(this, addresses);
            }

            return addresses;
          });
        }
      };
    }]);
})();
