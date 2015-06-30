Template.flights.helpers({
  allFlights: function () {
    return Flights.find({}, {sort: {date: -1}});
  }
});
