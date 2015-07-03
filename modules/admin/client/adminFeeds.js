Template.adminFeeds.helpers({
  feeds: function () {
    return Feeds.find();
  }
});

Template.adminFeeds.events({
  'click .remove-btn': function () {
    e.preventDefault();
    Feeds.remove(this._id);
  }
});
