'use strict'

var runnerService = new RunnerService(model);

routes.runners = function(id, path) {

  if (id && path === 'stats') {
    runnerService.fetchStats(id)
      .then(function(stats) {
          mount('runner-stats', { stats: stats });

      });

  } else {
    runnerService.fetchRunners()
      .then(function(runners) {
        mount('runners-page', { runners: runners });

      });

  }

}
