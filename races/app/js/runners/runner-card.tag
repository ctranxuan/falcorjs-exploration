<runner-card>
  <div class="demo-card-square mdl-card mdl-shadow--2dp">
    <div class="{ opts.runner.rank % 2 === 1 ? 'mdl-card__title-odd': 'mdl-card__title-even' } mdl-card__title mdl-card--expand">
      <h2 class="mdl-card__title-text">{opts.runner.firstName} {opts.runner.lastName}</h2>
    </div>
    <div class="mdl-card__supporting-text runner-number">
      #{opts.runner.number}
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="{ goToStats }">
        View Stats
      </button>
    </div>
  </div>

  <script type="text/es6">
    console.log('======%o', opts.runner);
    this.goToStats = (e) => {
      riot.route('runners/' + opts.runner._id + '/stats');
    }
  </script>
</runner-card>
