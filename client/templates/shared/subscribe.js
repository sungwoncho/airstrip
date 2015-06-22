Template.subscribe.events({
  'click .subscribe-btn, click .dismiss': function () {
    Session.set('subscribed', true);
  }
});

Template.subscribe.helpers({
  subscribed: function () {
    return Session.get('subscribed');
  }
});
