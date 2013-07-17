/* global fir,_ */

fir.component['EJS'] = (function() {

  return {

    ejs: function(config) {
      var templateStr;
      var templateElem;
      if (config.template instanceof HTMLElement) {
        templateStr = config.template.innerHTML;
      }
      else {
        templateElem = document.querySelector(config.template);
        templateStr = templateElem.innerHTML;
      }
      this._ejsCompiled = _.template(templateStr);
      return this;
    },

    render: function(parent) {
      var html = this._ejsCompiled(this.getData());
      this.el.innerHTML = html;
      if (parent !== undefined) {
        parent.appendChild(this.el);
      }
      return this.el;
    }

  };

})();