Template.flight.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}, skip: 1});
  }
});
