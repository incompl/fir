/* global fir,$,_ */

fir.component['gameEntity'] = (function() {

  return {

    init: function(config) {
      $(function() {
        $(config.container).append(this.$el);
      }.bind(this));
    },

    tick: function() {
      this.trigger('tick');
    },

    render: function() {
      this.$el.css('left', this.get('x') + 'px');
      this.$el.css('top', this.get('y') + 'px');
    },

    intersects: function(entity) {
      return this.get('y') >= 460;
      // TODO real maths :o
    }

  };

})();