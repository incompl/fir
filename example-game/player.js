/* global $ */

var Player = {

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
        this.set('accelLeft', 1);
      }
      else if (e.keyCode === 39) {
        this.set('accelLeft', -1);
      }
      else if (e.keyCode === 32) {
        this.jump(2);
      }
    },
    keyup: function(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        this.set('accelLeft', 0);
      }
    }
  }

};