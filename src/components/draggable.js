/* global fir,_ */

fir.component['draggable'] = (function() {

  var dragging = [];

  function dragMousedown(e) {
    this.set('draggingOffsetX', this.get('x') - e.clientX);
    this.set('draggingOffsetY', this.get('y') - e.clientY);
    dragging.push(this);
  }

  function dragMouseup() {
    dragging.length = 0;
  }

  function dragMousemove(e) {
    dragging.forEach(function(ent) {
      ent.set('x', e.clientX + ent.get('draggingOffsetX'));
      ent.set('y', e.clientY + ent.get('draggingOffsetY'));
    });
  }

  document.addEventListener('mouseup', dragMouseup);
  document.addEventListener('mousemove', dragMousemove);

  return {

    init: function(config) {
      this.el.addEventListener('mousedown', dragMousedown.bind(this));
    }

  };

})();