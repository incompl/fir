/* global alert */

var HelloWorld = {

  data: {
    title: 'Submit Your Rating',
    buttonMessage: 'Your rating: ',
    rating: 5
  },

  methods: {
    hello: function() {
      alert(this.get('buttonMessage') + this.get('rating'));
    }
  },

  events: {
    change: function(changed) {
      var ratingString;
      if (changed.rating) {
        ratingString = this.get('rating') + '/10 ';
        if (changed.rating <= 3) {ratingString += 'poor';}
        else if (changed.rating <= 6) {ratingString += 'ok';}
        else if (changed.rating <= 9) {ratingString += 'good';}
        else {ratingString += 'perfect';}
        this.set('ratingString', ratingString);
      }
    }
  },

  dom: {
    className: 'fancy',
    domEvents: {
      'click #click-me': 'hello'
    }
  },

  ejs: {
    template: '#template-hello'
  },

  dataBinding: {
    inputToData: {
      '#rating-slider': 'rating'
    },
    dataToElement: {
      'ratingString': '#rating'
    }
  }

};