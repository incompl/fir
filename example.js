/* global fir,alert */

(function() {

  var helloWorld = fir.entity(['DOM', 'EJS'])
  .data({
    title: 'Hello world button',
    buttonMessage: 'Hello world!'
  })
  .methods({
    hello: function() {
      alert(this.get('buttonMessage'));
    }
  })
  .dom({
    className: 'fancy',
    events: {
      'click #click-me': 'hello'
    }
  })
  .ejs({template: '#template-hello'});

  helloWorld.render(document.querySelector('#content'));

}());