<runners-page>
  <h1>Runners</h1>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col" each={ opts.runners } >
      <runner-card runner={ this }></runner-card>
    </div>
  </div>

  <script type="text/es6">
    console.log(opts.runners);
  </script>
</runners-page>
