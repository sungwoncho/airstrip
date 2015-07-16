Template.adminPanel.helpers({
  flights: function () {
    return Flights.find();
  }
});

Template.adminPanel.events({
  'click .manual-fetch-btn': function () {
    Meteor.call('allWeNeedIsFetch');
  }
});
