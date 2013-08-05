/* global fir,$,_,Player,Ground,requestAnimationFrame */

(function() {

  // requestAnimationFrame shim
  (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  // create game entities
  var gameEntities = [];
  gameEntities.push(fir.entity(Player, {x: 100, y: 100}));
  gameEntities.push(fir.entity(Ground, {x: 100, y: 300}));
  gameEntities.push(fir.entity(Ground, {x: 140, y: 260}));
  gameEntities.push(fir.entity(Ground, {x: 400, y: 300}));

  // game loop
  setInterval(function() {
    _.each(gameEntities, function(entity) {
      entity.tick();
    });
  }, 17);

  // render loop
  function step(timestamp) {
    _.each(gameEntities, function(entity) {
      entity.render();
    });
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);


}());