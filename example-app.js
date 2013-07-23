/* global fir,HelloWorld,$ */

(function() {

  var helloWorld = fir.entity(HelloWorld, {rating:8});

  helloWorld.render($('#content'));

}());