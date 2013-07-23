/* global fir,$ */

fir.component['dataBinding'] = (function() {

  return {

    init: function(config) {
      this._setupDataToElement(config.dataToElement);
      this._setupInputToData(config.inputToData);
    },

    _setupDataToElement: function(config) {

      // Cache jQuery objects from selectors
      var cached = {};
      Object.keys(config).forEach(function(key) {
        cached[key] = $(config[key]);
      });

      // Update DOM elements when entity data changes
      this.on('change', function(changed) {
        Object.keys(config).forEach(function(datum) {
          var $elem = cached[datum];
          var newValue = changed[datum];
          if ($elem) {
            if ($elem.length < 1) {
              $elem = $(config[datum]);
              cached[datum] = $elem;
            }
            $elem.text(newValue);
          }
        }.bind(this));
      }.bind(this));

      // Update DOM events when entity renders
      this.on('render', function() {
        Object.keys(this.getData()).forEach(function(datum) {
          var $elem = cached[datum];
          var value = this.get(datum);
          if ($elem) {
            if ($elem.length < 1) {
              $elem = $(config[datum]);
              cached[datum] = $elem;
            }
            $elem.text(value);
          }
        }.bind(this));
      }.bind(this));

    },

    _setupInputToData: function(config) {

      // Attach events to html element on render
      this.on('render', function() {
        Object.keys(config).forEach(function(key) {
          var $elem = $(key);
          var datum = config[key];
          $elem.on('change', function() {
            this.set(datum, $elem.val());
          }.bind(this));
          $elem.val(this.get(datum));
        }.bind(this));
      }.bind(this));

      // Update html element on data change
      this.on('change', function(changed) {
        Object.keys(config).forEach(function(key) {
          var datum = config[key];
          var $elem;
          if (changed[datum]) {
            $elem = $(key);
            $elem.val(changed[datum]);
          }
        }.bind(this));
      }.bind(this));

    }

  };

})();