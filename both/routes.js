Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onRun(function () {
  analytics.page();
  this.next();
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

// Admin routes
Router.onBeforeAction(function () {
  if (!Meteor.user().isAdmin) {
    Router.go('/admin/login');
  } else {
    this.next();
  }
},{
  only: ['admin', 'adminFlight.index', 'adminFlight.show']
});

Router.route('/admin', {
  template: 'adminPanel',
  waitOn: function () {
    return Meteor.subscribe('all-flights');
  }
});

Router.route('/admin/login');

Router.route('/admin/f/:date', {
  name: 'adminFlight.show',
  template: 'adminFlight',
  data: function () {
    return Flights.findOne({date: this.params.date});
  },
  waitOn: function () {
    return Meteor.subscribe('flight', this.params.date);
  }
});
