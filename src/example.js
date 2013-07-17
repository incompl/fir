/* global fir */

(function() {

  var contentElem = document.querySelector('#content');

  var thing = fir.entity(['DOM', 'EJS'])
  .dom({className: 'fancy'})
  .ejs({template: '#template-thing'});

  thing.set('title', 'Hello world!');

  thing.render(contentElem);

}());