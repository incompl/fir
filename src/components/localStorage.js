/* global fir,_ */

fir.component['localStorage'] = (function() {

  return {

    init: function(config) {
      this._savedFields = config.savedFields;
      if (config.saveOnChange) {
        this.on('change', function(changed) {
          var saved = false;
          Object.keys(changed).forEach(function(key) {
            if (!saved && this._savedFields[key] !== undefined) {
              this.save();
              saved = true;
            }
          }.bind(this));
        });
      }
    },

    save: function() {
      var serialized = {};
      Object.keys(this._savedFields).forEach(function(key) {
        serialized[key] = this.get(key);
      }.bind(this));
      if (this.get('id') !== undefined) {
        localStorage.setItem(this.get('id'), JSON.stringify(serialized));
      }
    },

    load: function() {
      var jsonStr = localStorage.getItem(this.get('id'));
      if (jsonStr !== null) {
        this.data = JSON.parse(jsonStr);
      }
    }

  };

})();