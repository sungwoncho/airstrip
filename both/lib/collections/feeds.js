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
  sourceName: {
    type: String
  },
  sourceUrl: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Feeds.attachSchema(FeedSchema);

Factory.define('feed', Feeds, {
  url: 'http://www.example.com/rss',
  dailyItemLimit: 3,
  position: 1,
  sourceName: 'Example',
  sourceUrl: 'http://www.example.com',
  description: 'Reddit digital nomad hot',
  createdAt: new Date('2015, 06, 30')
});

Feeds.allow({
  insert: function (userId, doc) {
    var user = Meteor.users.findOne(userId);
    return user.isAdmin;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var user = Meteor.users.findOne(userId);
    return user.isAdmin;
  }
});
