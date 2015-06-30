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
  },

  'hideItem': function (itemGuid) {
    if (!Meteor.user().isAdmin) {
      return;
    }

    var flight = Flights.findOne({'items.guid': itemGuid});
    Flights.update({_id: flight._id, 'items.guid': itemGuid}, {$set: {'items.$.hidden': true}});
  },

  'unhideItem': function (itemGuid) {
    if (!Meteor.user().isAdmin) {
      return;
    }

    var flight = Flights.findOne({'items.guid': itemGuid});
    Flights.update({_id: flight._id, 'items.guid': itemGuid}, {$set: {'items.$.hidden': false}});
  },

  'addItem': function (flightNumber, item) {
    if (!Meteor.user().isAdmin) {
      return;
    }

    Flights.update({number: flightNumber}, {$addToSet: {items: item}});
  }
});
