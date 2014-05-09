angular-geocomplete
===================

Simple Angular.js factory that gets GeoData from Google Maps's API with a simple name of a City or an Address.

It returns arrays of data and as much options are available for the query. It has two methods: `cities` and `citiesJSON`.

The first one returns an array with just a String with the following data and format: "City Name, State Name or abbreviature, Country Name".

The second method returns an array with a bunch more data formatted as the Google Maps's API does.

More docs on the code.

Usage
-----

Install with bower:

    bower install angular-geocomplate --save

Add to your HTML files:

    <script src='/bower_components/angular-geocomplete/angular-geocomplete.js'></script>

Now, inject to your application:

    angular.module('myApp', ['angular-geocomplete']);

Ready to use in your controllers!:

`controller.js:`

```js
var DemoCtrl = [
  '$scope',
  'geocomplete',
  function ($scope, geocomplete) {
    $scope.results = geocomplete.cities("San Francisco");
  }
]
```

Author
------
© 2014, Jose Luis Rivas `<me@ghostbar.co>`. 

License
-------
The files are licensed under the MIT terms.
