'use strict';

describe('factory: geoComplete', function () {
  var geoComplete,
      httpBackend,
      http,
      apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  
  var mockData = {
    "results": [
      {
        "address_components": [
          {
            "long_name": "Lake Mary",
            "short_name": "Lake Mary",
            "types": [
              "locality",
              "political"
            ]
          },
          {
            "long_name": "Seminole County",
            "short_name": "Seminole County",
            "types": [
              "administrative_area_level_2",
              "political"
            ]
          },
          {
            "long_name": "Florida",
            "short_name": "FL",
            "types": [
              "administrative_area_level_1",
              "political"
            ]
          },
          {
            "long_name": "United States",
            "short_name": "US",
            "types": [
              "country",
              "political"
            ]
          }
        ],
        "formatted_address": "Lake Mary, FL, USA",
        "geometry": {
          "bounds": {
            "northeast": {
              "lat": 28.786658,
              "lng": -81.3015168
            },
            "southwest": {
              "lat": 28.7262928,
              "lng": -81.37203509999999
            }
          },
          "location": {
            "lat": 28.7588833,
            "lng": -81.3178446
          },
          "location_type": "APPROXIMATE",
          "viewport": {
            "northeast": {
              "lat": 28.786658,
              "lng": -81.3015168
            },
            "southwest": {
              "lat": 28.7262928,
              "lng": -81.37203509999999
            }
          }
        },
        "types": [
          "locality",
          "political"
        ]
      }
    ],
    "status": "OK"
  };

  beforeEach(module('geocomplete'));

  beforeEach(inject(function ($httpBackend, $http, _geoComplete_) {
    httpBackend = $httpBackend;
    http = $http,
    geoComplete = _geoComplete_;

    httpBackend.whenGET(apiUrl + '?address=Lake+Mary&sensor=false').respond(mockData);
    httpBackend.whenGET(apiUrl + '?address=Lake+Mary&components=country:BR&sensor=false').respond(mockData);
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should return an array of matching city names using a promise and options', function () {
    var responseData;

    geoComplete.cities('Lake Mary', {components: 'country:BR'}).then(function (cities) {
      responseData = cities;
    });

    httpBackend.expectGET(apiUrl + '?address=Lake+Mary&components=country:BR&sensor=false');
    httpBackend.flush();
  });

  it('should search for a city', function () {
    var responseData;

    http.get(apiUrl + '?address=Lake+Mary&sensor=false').then(function (cities) {
      responseData = cities;
    });

    httpBackend.flush();

    expect(responseData).toBeDefined();
  });

  it('should return an array of matching city names via callback', function () {
    var responseData;

    geoComplete.cities('Lake Mary', {}, function (cities) {
      responseData = cities;
    });

    httpBackend.flush();

    expect(responseData).toEqual([ "Lake Mary, FL, USA" ]);
  });

  it('should return an array of matching city names using a promise', function () {
    var responseData;

    geoComplete.cities('Lake Mary').then(function (cities) {
      responseData = cities;
    });

    httpBackend.flush();

    expect(responseData).toEqual([ "Lake Mary, FL, USA" ]);
  });

  it('should return matching city info as a JSON object via callback', function () {
    var responseData;

    geoComplete.citiesJSON('Lake Mary', {}, function (cities) {
      responseData = cities;
    });

    httpBackend.flush();

    expect(responseData.length).not.toBe(0);
  });

  it('should return matching city info as a JSON object using a promise', function () {
    var responseData;

    geoComplete.citiesJSON('Lake Mary').then(function (cities) {
      responseData = cities;
    });

    httpBackend.flush();

    expect(responseData.length).not.toBe(0);
  });

  it('should return matching city info as a JSON object using a promise and options', function () {
    var responseData;

    geoComplete.citiesJSON('Lake Mary', {components: 'country:BR'}).then(function (cities) {
      responseData = cities;
    });

    httpBackend.expectGET(apiUrl + '?address=Lake+Mary&components=country:BR&sensor=false');
    httpBackend.flush();
  });
});
