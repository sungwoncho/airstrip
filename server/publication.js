Meteor.publish('recent-flights', function (options) {
  var limit = options ? options.limit : 5;
  return Flights.find({}, {sort: {date: -1}, limit: limit});
});

Meteor.publish('all-flights', function () {
  return Flights.find();
});

Meteor.publish('flight', function (date) {
  return Flights.find({date: date});
});
