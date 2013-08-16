/* global fir,$,_ */

fir.component['gameEntity'] = (function() {

  var entities = [];

  function onDestroy() {
    entities = _(entities).without(this);
  }

  return {

    init: function(config) {
      $(function() {
        $(this.stage.el).append(this.$el);
      }.bind(this));
      this.set('h', this.get('h') || 40);
      this.set('w', this.get('w') || 40);
      this.set('accelUp', 0);
      this.set('accelLeft', 0);
      this.set('mass', this.get('mass') || 5);
      entities.push(this);
      this.on('destroy', onDestroy.bind(this));
    },

    tick: function() {
      this.set('y', this.get('y') - this.get('accelUp') * this.get('mass'));
      this.set('x', this.get('x') - this.get('accelLeft') * this.get('mass'));
      this.trigger('tick');
    },

    render: function(zoom, cameraX, cameraY) {
      var x = Math.round(this.get('x') * zoom - cameraX);
      var y = Math.round(this.get('y')* zoom - cameraY);
      this.$el.css('transform', 'translate3d(' + x + 'px, ' +
                                                 y + 'px, ' +
                                                 '0)');
      this.$el.css('width', Math.round(this.get('w') * zoom) + 'px');
      this.$el.css('height', Math.round(this.get('h') * zoom) + 'px');
    },

    intersects: function(selector) {
      var results = [];
      entities.forEach(function(entity) {
        if (!entity.$el.is(selector)) {
          return;
        }
        if (this.get('y') + this.get('h') >= entity.get('y') &&
            this.get('y') <= entity.get('y') + entity.get('h') &&
            this.get('x') + this.get('w')  > entity.get('x') &&
            this.get('x') < entity.get('x') + entity.get('w') ) {
          results.push(entity);
        }
      }.bind(this));
      return results;
    },

    center: function() {
      return {
        x: this.get('x') + this.get('w') / 2,
        y: this.get('y') + this.get('h') / 2
      };
    }

  };

})();