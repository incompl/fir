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

          var adjustY = center.y < other.get('y') ||
                        center.y > other.get('y') + other.get('h') ||
                        (center.x > other.get('x') &&
                         center.x < other.get('x') + other.get('w'));

          if (adjustY && center.y < otherCenter.y) {
            this.set('y', other.get('y') - this.get('h'));
            this.set('accelUp', 0);
          }
          else if (adjustY) {
            this.set('y', other.get('y') + other.get('h'));
            this.set('accelUp', -.1);
          }

          else if (center.x < otherCenter.x) {
            this.set('x', other.get('x') - this.get('w'));
            this.set('accelUp', this.get('accelUp') - .1);
          }
          else {
            this.set('x', other.get('x') + other.get('w'));
            this.set('accelUp', this.get('accelUp') - .1);
          }

        }.bind(this));
      }
      else {
        this.set('accelUp', this.get('accelUp') - .1);
      }
    },

    jump: function(power) {
      var onGround = false;
      this.intersects('.ground').forEach(function(other) {
        if (this.get('y') + this.get('h') >= other.get('y')) {
          onGround = true;
        }
      }.bind(this));
      if (onGround) {
        this.set('accelUp', power);
      }
    }

  };

})();