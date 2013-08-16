/* global fir,$,_,Stage,Player,Ground,requestAnimationFrame */

(function() {

  var stage = fir.entity({stage:'#content'});

  stage.set('zoom', 1);

  stage.add(fir.entity(Player, {x: 100, y: 350}));
  stage.add(fir.entity(Ground, {x: 160, y: 400, w: 80}));
  stage.add(fir.entity(Ground, {x: 50, y: 500, w: 200}));
  stage.add(fir.entity(Ground, {x: 50, y: 300, w: 150, h: 20}));
  stage.add(fir.entity(Ground, {x: 200, y: 200}));
  stage.add(fir.entity(Ground, {x: 300, y: 100, h: 300}));
  stage.add(fir.entity(Ground, {x: 500, y: 200}));
  stage.add(fir.entity(Ground, {x: 400, y: 400, w: 300}));

}());