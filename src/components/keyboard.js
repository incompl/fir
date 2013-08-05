/* global fir,$,_ */

fir.component['keyboard'] = (function() {

  return {

    init: function(config) {
      if (config.keydown !== undefined) {
        document.addEventListener('keydown', config.keydown.bind(this));
      }
      if (config.keyup !== undefined) {
        document.addEventListener('keyup', config.keyup.bind(this));
      }
    }

  };

})();