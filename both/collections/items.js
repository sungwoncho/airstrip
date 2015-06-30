Items = new Mongo.Collection('items');

var ItemSchema = new SimpleSchema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  guid: {
    type: String
  },
  source: {
    type: String
  },
  author: {
    type: String,
    optional: true
  },
  publishedDate: {
    type: Date,
    optional: true
  },
  hidden: {
    type: Boolean,
    defaultValue: false
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Items.attachSchema(ItemSchema);

// Factory to generate test fixture
Factory.define('item', Items, {
  title: 'example title',
  url: 'http://example.com',
  guid: 'http://example.com',
  source: 'example.com',
  author: 'jon',
  publishedDate: new Date(2015, 6, 28),
  createdAt: new Date(2015, 6, 30)
});

Meteor.methods({
  'createItem': function (item, date) {
    if (!Meteor.isServer && !Meteor.user().isAdmin) return null;
    if (Items.find({'guid': item.guid}).count() > 0) {
      console.log(item.title + ' is duplicate.');
      return;
    }

    var newItemId = Items.insert(item);
    var flight = Flights.findOne({date: date});

    // If flight exists, insert item._id to itemIds, otherwise create a flight
    if (!!flight) {
      Flights.update({date: date}, {$addToSet: {itemIds: newItemId}});
    } else {
      Meteor.call('createFlight', {date: date, itemIds: [newItemId]});
    }
  },

  'toggleHidden': function (itemId) {
    if (!Meteor.isServer && !Meteor.user().isAdmin) return null;

    var item = Items.findOne(itemId);
    Items.update(itemId, {$set: {hidden: !item.hidden}});
  },

  'removeItem': function (itemId) {
    if (!Meteor.isServer && !Meteor.user().isAdmin) return null;

    Items.remove(itemId);
    Flights.update({'itemIds': itemId}, {$pull: {'itemIds': itemId}});
  }
});
