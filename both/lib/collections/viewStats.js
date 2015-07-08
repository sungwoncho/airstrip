ViewStats = new Mongo.Collection('viewStats');

var viewStatSchema = new SimpleSchema({
  itemId: {
    type: String
  },
  viewCount: {
    type: Number,
    defaultValue: 0
  },
  viewedIPs: {
    type: [String]
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

ViewStats.attachSchema(viewStatSchema);

// Factory to generate test fixture
Factory.define('viewStat', ViewStats, {
  itemId: 'a2',
  viewCount: 0,
  viewedIPs: [],
  createdAt: new Date(2015, 6, 30)
});

Meteor.methods({
  incrementViewCount: function (itemId, ipAddress) {
    var viewStat = ViewStats.findOne({itemId: itemId});

    // Return if the client already viewed the item
    if (_.contains(viewStat.viewedIPs, ipAddress)) return;

    ViewStats.update({itemId: itemId}, {$inc: {viewCount: 1}, $addToSet: {viewedIPs: ipAddress}});
  }
});
