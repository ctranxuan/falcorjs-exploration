class RunnerService {

  constructor(model) {
    this.model = model;
  }

  fetchRunners() {
    var promise = new Promise(function(resolve, error) {
      this.model
          .get(['runnersById', {from: 1, to: 3}, ['firstName', 'lastName', 'number', 'rank']])
          .then(function(value) {
            console.log('value %o', value.json.runnersById);
            var runnersById = value.json.runnersById;
            var runners =
              Object.getOwnPropertyNames(runnersById)
                    .map(key => {
                      var runner = runnersById[key];
                      // cannot be id since opts has already an id
                      runner['_id'] = key;
                      return runner;
                    });

            resolve(runners);
          }, function(err) {
            error(err);

          }
        );
    }.bind(this));

    return promise;
  }

  fetchStats(runnerId) {
    var promise = new Promise(function(resolve, error) {
      var batchModel = this.model.batch();

      // batchModel
      //     .get(['health', runnerId, ['heartBeat', 'bloodPressure', 'runner'], ["firstName", "lastName"]])
      //     .then(function(value) {
      //       var healthStats = value.json.health;
      //       stats.push(healthStats);
      //       console.log('health: %o', healthStats);
      //
      //
      //     });
      // batchModel
      //     .get(['geoLocation', runnerId, ['latitude', 'longitude']])
      //     .then(function(value) {
      //       var geoLoc = value.json.geoLocation;
      //       stats.push(geoLoc);
      //       console.log('geoLocation: %o', geoLoc);
      //
      //       resolve(stats);
      //     });

      var healthPromise = batchModel
          .get(['health', runnerId, ['heartBeat', 'bloodPressure', 'runner'], ["firstName", "lastName"]]);

      var geoLocPromise = batchModel
          .get(['geoLocation', runnerId, ['latitude', 'longitude']]);

      Promise.all([healthPromise, geoLocPromise])
            .then(results => {
              var stats = results.reduce((obj, value) => {
                if (value.json.health !== undefined) {
                  obj['health'] = value.json.health[runnerId];

                } else if (value.json.geoLocation !== undefined) {
                  obj['geoLocation'] = value.json.geoLocation[runnerId];

                }

                return obj;
              }, {});

              stats['firstName'] = stats.health.runner.firstName;
              stats['lastName'] = stats.health.runner.lastName;
              delete stats.health.runner;
              console.log(stats);
              resolve(stats);
            });
    }.bind(this));

    return promise;
  }
}
