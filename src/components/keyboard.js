/* global fir,$,_ */

fir.component['keyboard'] = (function() {

  return {

    init: function(config) {
      if (config.keydown !== undefined) {
        this._onKeydown = config.keydown.bind(this);
        document.addEventListener('keydown', this._onKeydown);
      }
      if (config.keyup !== undefined) {
        this._onKeyup = config.keyup.bind(this);
        document.addEventListener('keyup', this._onKeyup);
      }
    },

    destroy: function() {
      if (this._onKeydown !== undefined) {
        document.removeEventListener('keydown', this._onKeydown);
      }
      if (this._onKeyup !== undefined) {
        document.removeEventListener('keyup', this._onKeyup);
      }
    }

  };

})();