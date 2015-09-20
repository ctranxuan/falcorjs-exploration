<runner-health>
  <div class="demo-card-event mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--border runner-health">
      <div class="mdl-card__subtitle-text runner-card-title">Health</div>
    </div>
    <div class="mdl-card__title mdl-card--expand runner-health">
      <h6>
        Heart Beat: {opts.health.heartBeat}<br>
        Blood Pressure: {opts.health.bloodPressure}
      </h6>
    </div>
  </div>

 <script type="text/es6">
    console.log('runner-health: %o', opts);
  </script>
</runner-health>
