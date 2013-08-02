/* global fir,_ */

fir.component['gravity'] = (function() {

  return {

    init: function(config) {
      this._config = config;
      this.set('accelUp', 0);
      this.set('mass', 5);

      this.on('tick', function() {
        this._gravityTick();
      }.bind(this));
    },

    _gravityTick: function() {
      var y = this.get('y');
      var accelUp = this.get('accelUp');
      if (this.intersects()) {
        accelUp = 0;
        this.set('y', 460); // TODO
      }
      else {
        accelUp -= .1;
        this.set('y', y - accelUp * this.get('mass'));
      }
      this.set('accelUp', accelUp);
    }

  };

})();