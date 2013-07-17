/* global fir */

fir.component['DOM'] = (function() {

  return {

    init: function() {
      this.el = document.createElement('div');
    },

    dom: function(config) {
      if (config.className) {
        this.el.classList.add(config.className);
      }
      return this;
    },

    appendTo: function(parent) {
      parent.appendChild(this.el);
    }

  };

})();