/* global fir,HelloWorld,$ */

(function() {

  var helloWorld = fir.entity(HelloWorld, {id: 1});

  helloWorld.load();

  helloWorld.render($('#content'));

}());