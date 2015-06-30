Router.onBeforeAction(function () {
  if (!Meteor.user() || !Meteor.user().isAdmin) {
    Router.go('/admin/login');
  } else {
    this.next();
  }
},{
  only: ['admin', 'adminFlight.show']
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
