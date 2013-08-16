/* global fir,$,_ */

fir.component['stage'] = (function() {

  return {

    data: {
      zoom: 1,
      cameraX: 0,
      cameraY: 0
    },

    init: function(config) {

      this.el = $(config);

      var gameEntities = [];
      this._gameEntities = gameEntities;

      // requestAnimationFrame shim
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;

      // game loop
      setInterval(function() {
        _.each(gameEntities, function(entity) {
          if (entity.destroyed) {
            gameEntities = _(gameEntities).without(entity);
          }
          else {
            entity.tick();
          }
        });
      }, 17);

      // render loop
      var step = function(timestamp) {
        _.each(gameEntities, function(entity) {
          entity.render(this.get('zoom'),
                        this.get('cameraX'),
                        this.get('cameraY'));
        }.bind(this));
        requestAnimationFrame(step);
      }.bind(this);
      requestAnimationFrame(step);
    },

    add: function(entity) {
      entity.stage = this;
      this._gameEntities.push(entity);
    }

  };

})();