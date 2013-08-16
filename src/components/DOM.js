/* global fir,console,$ */

fir.component['dom'] = (function() {

  function onDestroy() {
    this.$el.remove();
  }

  return {

    init: function(config) {
      this.el = document.createElement('div');
      this.$el = $(this.el);
      if (config.className) {
        this.el.classList.add(config.className);
      }
      if (config.domEvents) {
        Object.keys(config.domEvents).forEach(function(key) {
          this.domBind(key, config.domEvents[key]);
        }.bind(this));
      }
      this.on('destroy', onDestroy.bind(this));
      return this;
    },

    domBind: function(event, methodName) {

      var eventType;
      var eventSelector;
      var method = this[methodName].bind(this);

      if (event.indexOf(' ') > -1) {
        eventType = event.substr(0, event.indexOf(' '));
        eventSelector = event.substr(event.indexOf(' ') + 1);
      }
      else {
        eventType = event;
      }

      if (eventSelector === undefined) {
        this.$el.on(eventType, method);
      }
      else {
        this.$el.on(eventType, eventSelector, method);
      }

    },

    appendTo: function(parent) {
      if (parent instanceof $) {
        parent.append(this.$el);
      }
      else {
        parent.appendChild(this.el);
      }
    }

  };

})();