Template.subscribe.events({
  'click .subscribe-btn, click .dismiss': function () {
    Session.set('subscribed', true);
    analytics.track('Dismissed subscription notice.');
  }
});

Template.subscribe.helpers({
  subscribed: function () {
    return Session.get('subscribed');
  }
});
