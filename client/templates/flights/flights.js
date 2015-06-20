Template.flights.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}, skip: 1});
  },

  mostRecentFlight: function () {
    return Flights.findOne({}, {sort: {date: -1}, limit: 1});
  }
});
