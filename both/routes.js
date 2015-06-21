Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  template: 'flight',
  data: function () {
    return Flights.findOne({}, {sort: {date: -1}});
  },
  waitOn: function () {
    return Meteor.subscribe('recent-flights', {limit: 5});
  }
});

Router.route('/f/:date', {
  name: 'flight.show',
  template: 'flight',
  data: function () {
    return Flights.findOne({date: this.params.date});
  },
  waitOn: function () {
    return [Meteor.subscribe('recent-flights'), Meteor.subscribe('flight', this.params.date)];
  }
});

Router.route('/f', {
  name: 'flight.index',
  template: 'flights',
  waitOn: function () {
    return Meteor.subscribe('all-flights');
  }
});
