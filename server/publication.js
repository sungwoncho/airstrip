Meteor.publish('flights', function (options) {
  var limit = options.limit;
  return Flights.find({}, {sort: {date: -1}, limit: limit});
});
