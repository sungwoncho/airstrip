Meteor.publish('flights', function () {
  return Flights.find();
});
