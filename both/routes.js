Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  template: 'flight',
  data: function () {
    return Flights.findOne({}, {sort: {date: -1}});
  },
  waitOn: function () {
    return Meteor.subscribe('recent-flights', {limit: 4});
  }
});

Router.route('/f/:date', {
  name: 'flight.show',
  template: 'flight',
  data: function () {
    return Flights.findOne({date: this.params.date});
  },
  waitOn: function () {
    return [Meteor.subscribe('recent-flights', {limit: 4}), Meteor.subscribe('flight', this.params.date)];
  }
});

Router.route('/f', {
  name: 'flight.index',
  template: 'flights',
  waitOn: function () {
    return Meteor.subscribe('all-flights');
  }
});
