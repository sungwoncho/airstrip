Meteor.publish('recent-flights', function (options) {
  var limit = options ? options.limit : 5;
  return Flights.find({}, {sort: {date: -1}, limit: limit});
});

Meteor.publish('all-flights', function () {
  return Flights.find({}, {fields: {number: 1, date: 1}});
});

Meteor.publish('flight', function (date) {
  return Flights.find({date: date});
});

Meteor.publish('items', function (date) {
  var flight = Flights.findOne({date: date});

  return Items.find({_id: {$in: flight.itemIds}});
});

Meteor.publish('userData', function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'isAdmin': 1}});
});
