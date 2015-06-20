Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'flights',
  waitOn: function () {
    return Meteor.subscribe('flights', {limit: 5});
  }
});

Router.route('/f/:date', {
  name: 'flight',
  data: function () {
    return Flights.findOne({date: this.params.date});
  },
  waitOn: function () {
    return Meteor.subscribe('flights', {date: this.params.date});
  }
});
