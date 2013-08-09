/* global $ */

var Player = {

  data: {
    movingRight: false,
    movingLeft: false,
    speed: .1,
    maxSpeed: 1
  },

  events: {

    'tick': function() {
      if (this.get('movingRight') === true) {
        this.set('accelLeft', this.get('accelLeft') - this.get('speed'));
      }
      else if (this.get('movingLeft') === true) {
        this.set('accelLeft', this.get('accelLeft') + this.get('speed'));
      }
      else {
        this.set('accelLeft', Math.round(this.get('accelLeft') / 3));
      }
      if (this.get('accelLeft') > this.get('maxSpeed')) {
        this.set('accelLeft', this.get('maxSpeed'));
      }
      if (Math.abs(0 - this.get('accelLeft')) > this.get('maxSpeed')) {
        this.set('accelLeft', 0 - this.get('maxSpeed'));
      }
    }

  },

  dom: {
    className: 'player'
  },

  gameEntity: {
    container: '#content'
  },

  gravity: {
    ground: '.ground'
  },

  dataBinding: {
    dataToElement: {
      'x': '#x',
      'y': '#y'
    }
  },

  keyboard: {

    keydown: function(e) {
      if (e.keyCode === 37) {
        this.set('movingLeft', true);
      }
      else if (e.keyCode === 39) {
        this.set('movingRight', true);
      }
      else if (e.keyCode === 32) {
        this.jump(2);
      }
    },

    keyup: function(e) {
      if (e.keyCode === 37) {
        this.set('movingLeft', false);
      }
      else if (e.keyCode === 39) {
        this.set('movingRight', false);
      }
    }

  }

};