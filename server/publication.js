Meteor.publish('recent-flights', function (options) {
  var limit = options ? options.limit : 5;
  var flights = Flights.find({}, {sort: {date: -1}, limit: limit});
  var itemIds = flights.map(function (flight) {
    return flight.itemIds;
  });
  itemIds = _.flatten(itemIds);

  return [
    Flights.find({}, {sort: {date: -1}, limit: limit}),
    Items.find({_id: {$in: itemIds}})
  ];
});

Meteor.publish('all-flights', function () {
  return Flights.find({}, {fields: {number: 1, date: 1}});
});

Meteor.publish('flight', function (date) {
  var flight = Flights.findOne({date: date});

  return [
    Flights.find({date: date}),
    Items.find({_id: {$in: flight.itemIds}})
  ];
});

Meteor.publish('items', function (date) {
  var flight = Flights.findOne({date: date});

  return Items.find({_id: {$in: flight.itemIds}});
});

Meteor.publish('feeds', function () {
  var user = Meteor.users.findOne(this.userId);
  if (user.isAdmin) {
    return Feeds.find();
  }
});

Meteor.publish('feed', function (id) {
  var user = Meteor.users.findOne(this.userId);
  if (user.isAdmin) {
    return Feeds.find(id);
  }
});

Meteor.publish('userData', function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'isAdmin': 1}});
});
