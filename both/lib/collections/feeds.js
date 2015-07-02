Feeds = new Mongo.Collection('feeds');

var FeedSchema = new SimpleSchema({
  url: {
    type: String
  },
  dailyItemLimit: {
    type: Number
  },
  position: {
    type: Number,
    allowedValues: [1,2,3,4,5]
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Feeds.attachSchema(FeedSchema);

Factory.define('feed', Feeds, {
  url: 'https://example.com/rss',
  dailyItemLimit: 3,
  position: 1,
  description: 'Reddit digital nomad hot',
  createdAt: new Date('2015, 06, 30')
});

Feeds.allow({
  insert: function (userId, doc) {
    var user = Meteor.users.findOne(userId);
    return user.isAdmin || Meteor.isServer;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var user = Meteor.users.findOne(userId);
    return user.isAdmin;
  }
});
