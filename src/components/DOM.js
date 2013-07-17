/* global fir,console,$ */

fir.component['DOM'] = (function() {

  return {

    init: function() {
      this.el = document.createElement('div');
      this.$el = $(this.el);
    },

    dom: function(config) {
      if (config.className) {
        this.el.classList.add(config.className);
      }
      if (config.events) {
        Object.keys(config.events).forEach(function(key) {
          this.domBind(key, config.events[key]);
        }.bind(this));
      }
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
      parent.appendChild(this.el);
    }

  };

})();