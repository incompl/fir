/* global fir,_ */

fir.component['gravity'] = (function() {

  function gravityTick() {
    var intersects = this.intersects('.ground');
    if (intersects.length > 0) {
      intersects.forEach(function(other) {
        var center = this.center();
        var otherCenter = other.center();

        var thisTop = this.get('y');
        var thisBottom = this.get('y') + this.get('h');
        var thisLeft = this.get('x');
        var thisRight = this.get('x') + this.get('w');

        var otherTop = other.get('y');
        var otherBottom = other.get('y') + other.get('h');
        var otherLeft = other.get('x');
        var otherRight = other.get('x') + other.get('w');

        var overlapY = null;
        var overlapX = null;

        if (thisBottom >= otherTop && thisTop < otherTop) {
          overlapY = thisBottom - otherTop;
        }
        else if (thisTop <= otherBottom && thisBottom > otherBottom) {
          overlapY = otherBottom - thisTop;
        }

        if (thisRight > otherLeft && thisLeft < otherLeft) {
          overlapX = thisRight - otherLeft;
        }
        else if (thisLeft < otherRight && thisRight > otherRight) {
          overlapX = otherRight - thisLeft;
        }

        if (overlapY === 0 && overlapX === 0) {
          return;
        }

        var adjustY = overlapY !== null && (overlapY <= overlapX || overlapX === null);

        if (adjustY && thisTop < otherTop) {
          this.set('y', other.get('y') - this.get('h'));
          if (this.get('accelUp') < -.1) {
            this.set('accelUp', -.1);
          }
        }
        else if (adjustY) {
          this.set('y', other.get('y') + other.get('h'));
          if (this.get('accelUp') > -.1) {
            this.set('accelUp', -.1);
          }
        }

        else if (thisLeft < otherLeft) {
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
  }

  return {

    init: function(config) {
      this.set('accelUp', config.accelUp || 0);
      this.on('tick', gravityTick.bind(this));
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