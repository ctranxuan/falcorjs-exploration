<runner-stats>
  <h1>{opts.stats.firstName} {opts.stats.lastName}</h1>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col" >
      <runner-health health="{opts.stats.health}"></runner-health>
    </div>
    <div class="mdl-cell mdl-cell--6-col" >
      <runner-geolocation latitude="{opts.stats.geoLocation.latitude}"
                          longitude="{opts.stats.geoLocation.longitude}">
      </runner-geolocation>
    </div>
  </div>
  <script type="text/es6">
    console.log('runnert-stats: %o', opts.stats);
  </script>
</runner-stats>
