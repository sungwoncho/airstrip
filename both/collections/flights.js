Flights = new Mongo.Collection('flights');

var FlightSchema = new SimpleSchema({
  date: {
    type: String
  },
  number: {
    type: Number
  },
  itemIds: {
    type: [Number]
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

// Factory to generate test fixture
Factory.define('flight', Flights, {
  date: '20150630',
  number: '18',
  itemIds: [],
  createdAt: new Date(2015, 06, 30)
});

Meteor.methods({
  'createFlight': function (doc) {
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
