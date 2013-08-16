/* jshint devel:true */
/* global _ */

window.fir = (function() {

  var fir = {
    component: {}
  };

  var Entity = {

    _setup: function() {
      this._components = [];
      this._data = {};
      this._subscribers = {};
    },

    _methods: function(methods) {
      Object.keys(methods).forEach(function(key) {
        this[key] = methods[key];
      }.bind(this));
    },

    _addEvents: function(events) {
       Object.keys(events).forEach(function(key) {
        this.on(key, events[key]);
      }.bind(this));
    },

    addComponent: function(componentName, config) {
      var component = fir.component[componentName];
      this._components.push(componentName);
      fir.extend(this, component, true);
      if (component.init) {
        this.init(config);
      }
    },

    get data() {
      return this._data;
    },

    set data(data) {
      fir.extend(this._data, data, true);
      this.trigger('change', data);
    },

    set: function(name, value, trigger) {
      if (trigger === undefined) {
        trigger = true;
      }
      this._data[name] = value;
      var eventArg = {};
      eventArg[name] = value;
      if (trigger) {
        this.trigger('change', eventArg);
      }
    },

    get: function(name) {
      return this._data[name];
    },

    on: function(type, fun) {
      if (this._subscribers[type] === undefined) {
        this._subscribers[type] = [];
      }
      this._subscribers[type].push(fun);
    },

    off: function(type, fun) {
      this._subscribers[type] =
        _(this._subscribers[type]).without(fun);
    },

    trigger: function(type, arg) {
      if (this._subscribers[type] !== undefined) {
        this._subscribers[type].forEach(function(fun) {
          fun.call(this, arg);
        }.bind(this));
      }
    }

  };

  fir.extend = function(target, o, overwrite) {
    if (target === undefined) {
      target = {};
    }
    if (overwrite === undefined) {
      overwrite = false;
    }
    if (o !== undefined) {
      for (var key in o) {
        if (o.hasOwnProperty(key) && (overwrite || target[key] === undefined)) {
          target[key] = o[key];
        }
      }
    }
    return target;
  };

  fir.inherit = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };

  fir.entity = function(configs, data) {
    var newEntity = fir.inherit(Entity);
    newEntity._setup();
    if (data !== undefined) {
      newEntity.data = data;
    }
    Object.keys(configs).forEach(function(key) {
      var config = configs[key];
      var newEntityData;
      if (key === 'data') {
        newEntityData = newEntity.data;
        fir.extend(newEntityData, config);
        fir.extend(newEntity._data, newEntityData, true);
      }
      else if (key === 'methods') {
        newEntity._methods(config);
      }
      else if (key === 'events') {
        newEntity._addEvents(config);
      }
      else if (key === 'init') {
        config.call(newEntity);
      }
      else if (this.component[key] !== undefined) {
        newEntity.addComponent(key, config);
      }
      else {
        console.error('Unknown component: ' + key);
      }
    }.bind(this));
    return newEntity;
  };

  return fir;

})();