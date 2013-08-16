/* global fir,$,_ */

fir.component['gameEntity'] = (function() {

  var entities = [];

  return {

    init: function(config) {
      $(function() {
        $(config.container).append(this.$el);
      }.bind(this));
      this.set('h', this.get('h') || 40);
      this.set('w', this.get('w') || 40);
      this.set('accelUp', 0);
      this.set('accelLeft', 0);
      this.set('mass', this.get('mass') || 5);
      entities.push(this);
    },

    tick: function() {
      this.set('y', this.get('y') - this.get('accelUp') * this.get('mass'));
      this.set('x', this.get('x') - this.get('accelLeft') * this.get('mass'));
      this.trigger('tick');
    },

    render: function() {
      this.$el.css('left', this.get('x') + 'px');
      this.$el.css('top', this.get('y') + 'px');
      this.$el.css('width', this.get('w') + 'px');
      this.$el.css('height', this.get('h') + 'px');
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