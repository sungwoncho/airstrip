Meteor.publish('feeds', function () {
  return Feeds.find();
})
