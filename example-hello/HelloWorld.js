/* global alert */

var HelloWorld = {

  data: {
    title: 'Rate this app!',
    buttonMessage: 'Your rating: ',
    rating: 5
  },

  methods: {

    hello: function() {
      alert(this.get('buttonMessage') + this.get('rating'));
    },

    updateRatingString: function() {
      var rating = this.get('rating');
      var ratingString = this.get('rating') + '/10 ';
      if (rating <= 1) {ratingString += 'terrible';}
      else if (rating <= 4) {ratingString += 'poor';}
      else if (rating <= 6) {ratingString += 'ok';}
      else if (rating <= 9) {ratingString += 'good';}
      else {ratingString += 'perfect';}
      this.set('ratingString', ratingString);
    }

  },

  init: function() {
    this.updateRatingString();
  },

  events: {
    change: function(changed) {
      if (changed.rating) {
        this.updateRatingString();
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
  },

  localStorage: {
    saveOnChange: true,
    savedFields: {
      rating: true
    }
  }

};