<runner-geolocation>
  <div class="demo-card-event mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--border runner-geolocation">
      <div class="mdl-card__subtitle-text runner-card-title">Position</div>
    </div>
    <div class="mdl-card__title mdl-card--expand runner-geolocation">
      <h6>
        Latitude: {opts.latitude}°<br>
        Longitude: {opts.longitude}°
      </h6>
    </div>
  </div>

  <script type="text/es6">
  console.log('runner-geolocation: %o', opts);
  </script>
</runner-geolocation>
