Router.onBeforeAction(function () {
  if (!Meteor.user() || !Meteor.user().isAdmin) {
    Router.go('/admin/login');
  } else {
    this.next();
  }
},{
  only: ['admin', 'adminFlight.show', 'adminFeeds']
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

Router.route('/admin/feeds', {
  waitOn: function () {
    return Meteor.subscribe('feeds');
  }
});

Router.route('/admin/feeds/:_id/edit', {
  name: 'adminFeedEdit',
  data: function () {
    return Feeds.findOne();
  },
  waitOn: function () {
    return Meteor.subscribe('feed', this.params._id);
  }
});
