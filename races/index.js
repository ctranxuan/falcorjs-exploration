var falcor = require('falcor');
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var app = express();
var $ref = falcor.Model.ref;

var data = {
  runnersById: {
    1: {
        firstName: "Bob",
        lastName: "Martin",
        age: 28,
        number: 1549,
        rank: 1
      },
    2: {
        firstName: "Alice",
        lastName: "Neuvic",
        age: 29,
        number: 798,
        rank: 2
      },
    3: {
        firstName: "John",
        lastName: "Smith",
        age: 42,
        number: 923,
        rank: 3
      },
    4: {
        firstName: "Kelly",
        lastName: "McMillan",
        age: 35,
        number: 1532,
        rank: 4
      }
  },
  health: [
    {
      heartBeat: 100,
      bloodPressure: 140,
      runner: $ref('runnersById[1]')
    },
    {
      heartBeat: 120,
      bloodPressure: 135,
      runner: $ref('runnersById[2]')
    },
    {
      heartBeat: 130,
      bloodPressure: 150,
      runner: $ref('runnersById[3]')
    },
    {
      heartBeat: 105,
      bloodPressure: 110,
      runner: $ref('runnersById[4]')
    }
  ],
  geoLocation: [
    {
      latitude: 45.188529,
      longitude: 5.724524,
      runner: $ref('runnersById[1]')
    },
    {
      latitude: 45.188530,
      longitude: 5.724514,
      runner: $ref('runnersById[2]')
    },
    {
      latitude: 45.188029,
      longitude: 5.724024,
      runner: $ref('runnersById[3]')
    },
    {
      latitude: 45.188000,
      longitude: 5.724000,
      runner: $ref('runnersById[4]')
    }
  ]
};

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      // match a request for the key "greeting"
      route: "greeting",
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return {path:["greeting"], value: "Hello World"};
      }
    },
    {
      route: "runnersById[{integers:runnerId}]['firstName', 'lastName', 'age', 'number', 'rank']",
      get: function(pathSet) {
        var results = [];

        console.log('---- %o', pathSet);
         // Above we specified an runnerId identifier that is an
         // array of ids which we can loop over
        pathSet.runnerId.forEach(function(runnerId) {

           // Next, an array of key names that map is held at pathSet[2]
           pathSet[2].map(function(key) {
             var runner = data.runnersById[runnerId];

             results.push({
               path: ['runnersById', runnerId, key],
               value: runner[key]
             });
           });
         });

         return results;
       }
    },
    {
      route: "health[{integers:runnerId}]['heartBeat', 'bloodPressure', 'runner']",
      get: function(pathSet) {
        var results = [];

        console.log('health %o', pathSet);
         // Above we specified an runnerId identifier that is an
         // array of ids which we can loop over
        pathSet.runnerId.forEach(function(runnerId) {
           // Next, an array of key names that map is held at pathSet[2]
           pathSet[2].map(function(key) {
             var runnerHealth = data.health[runnerId - 1];

             results.push({
               path: ['health', runnerId, key],
               value: runnerHealth[key]
             });
           });
         });

         return results;
       }
    },
    {
      route: "geoLocation[{integers:runnerId}]['latitude', 'longitude', 'runner']",
      get: function(pathSet) {
        var results = [];
        console.log('geoLocation %o', pathSet);
        pathSet.runnerId.forEach(function(runnerId) {
          pathSet[2].map(function(key) {
            var geoLocation = data.geoLocation[runnerId - 1];

            results.push({
              path: ['geoLocation', runnerId, key],
              value: geoLocation[key]
            });
          });
        });

        return results;
      }
    }
  ]);
}));

// serve static files from current directory
app.use(express.static(__dirname + '/'));

var server = app.listen(3000);
