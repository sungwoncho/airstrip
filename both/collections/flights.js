Flights = new Mongo.Collection('flights');

Meteor.methods({
  'addFlight': function (doc) {
    try {
      currentFlightNumber = Flights.findOne({}, {sort: {number: -1}}).number;
    } catch (e) {
      currentFlightNumber = 0;
    }

    doc.number = currentFlightNumber + 1;
    Flights.insert(doc);

    return doc._id;
  }
});
