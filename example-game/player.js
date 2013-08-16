/* global $ */

var Player = {

  data: {
    movingRight: false,
    movingLeft: false,
    speed: .1,
    maxSpeed: 1
  },

  destroy: function() {
    $('#hud').text('game over');
  },

  dom: {
    className: 'player'
  },

  gameEntity: {},

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
        this.set('movingRight', false);
        this.set('movingLeft', true);
      }
      else if (e.keyCode === 39) {
        this.set('movingLeft', false);
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

  },

  events: {

    'tick': function() {

      // Keyboard movement
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

      // Fell off the stage
      if (this.get('y') > 1000) {
        this.destroy();
      }

      // Camera follows player
      this.stage.set('cameraX', Math.round(this.get('x') * this.stage.get('zoom') - window.innerWidth / 2));
      this.stage.set('cameraY', Math.round(this.get('y') * this.stage.get('zoom') - window.innerHeight / 2));
    }

  }

};