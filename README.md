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

    bower install angular-geocomplete --save

Add to your HTML files:

    <script src='/bower_components/angular-geocomplete/angular-geocomplete.js'></script>

Now, inject to your application:

    angular.module('myApp', ['geocomplete']);

Ready to use in your controllers!:

`controller.js:`

```js
// using callbacks
var DemoCtrl = [ '$scope', 'geoComplete', function ($scope, geoComplete) {
  geoComplete.cities("San Francisco", function (results) {
    $scope.results = results;
  });
}];

// using promises
var DemoCtrl = [ '$scope', 'geoComplete', function ($scope, geoComplete) {
  geoComplete.cities("San Francisco").then(function (results) {
    $scope.results = results;
  });
}];
```

Demo
----
1. Plunker: http://plnkr.co/edit/yatsd3Cqg0te6TPMpjLV?p=preview
2. Local: Run ```gulp``` to run tests, generate coverage and load demo or ```gulp serve``` to just load the demo. (a browser window will automatically open to http://localhost:8000)

Tests
-----
- Run ```gulp test```
- Coverage is generated in the ```coverage/``` folder

Author
------
© 2014, Jose Luis Rivas `<me@ghostbar.co>`. 

Contributors
------------
Sha Alibhai (@shalotelli)

License
-------
The files are licensed under the MIT terms.
