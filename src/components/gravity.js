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
      var intersects = this.intersects('.ground');
      if (intersects.length > 0) {
        intersects.forEach(function(other) {
          var center = this.center();
          var otherCenter = other.center();
          var yDiffGreater = Math.abs(center.y - otherCenter.y) >
                             Math.abs(center.x - otherCenter.x);
          if (yDiffGreater && center.y > otherCenter.y) {
            this.set('y', other.get('y') + other.get('h'));
          }
          else if (yDiffGreater) {
            this.set('y', other.get('y') - this.get('h'));
          }
          else if (center.x > otherCenter.x) {
            this.set('x',  other.get('x') + other.get('w'));
            this.set('accelUp', this.get('accelUp') - .1);
          }
          else {
            this.set('x', other.get('x') - this.get('w'));
            this.set('accelUp', this.get('accelUp') - .1);
          }
        }.bind(this));
      }
      else {
        this.set('accelUp', this.get('accelUp') - .1);
      }
    },

    jump: function(power) {
      this.set('accelUp', power);
    }

  };

})();