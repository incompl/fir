/* global window */

window.fir = (function() {

  var fir = {
    component: {}
  };

  var Entity = {

    _setup: function() {
      this._components = [];
      this._data = {};
    },

    addComponent: function(component) {
      this._components.push(component);
      fir.extend(this, component);
    },

    getData: function() {
      return this._data;
    },

    set: function(name, value) {
      this._data[name] = value;
    }

  };

  fir.extend = function(target, o) {
    if (target === undefined) {
      target = {};
    }
    if (o !== undefined) {
      for (var key in o) {
        if (o.hasOwnProperty(key)) { // && target[key] === undefined) {
          target[key] = o[key];
        }
      }
    }
    return target;
  };

  fir.inherit = function(o) {
    function F() {}
    F.prototype = this;
    var result = new F();
    if (o) {
      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          result[key] = o[key];
        }
      }
    }
    return result;
  };

  fir.entity = function(components) {
    var newEntity = fir.inherit(Entity);
    newEntity._setup();
    components.forEach(function(componentStr) {
      var component = this.component[componentStr];
      newEntity.addComponent(component);
      if (component.init) {
        newEntity.init();
      }
    }.bind(this));
    return newEntity;
  };

  return fir;

})();