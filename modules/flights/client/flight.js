var getItemsForFlight = function (flight) {
  return Items.find({'hidden': false, flightId: flight._id});
};

Template.flight.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}, limit: 4});
  },

  itemCount: function () {
    return getItemsForFlight(this).count();
  },

  sources: function () {
    var items = getItemsForFlight(this).fetch();
    var sources = _.pluck(items, 'source');
    var uniqSources = _.uniq(sources);
    return uniqSources;
  },

  items: function () {
    return getItemsForFlight(this);
  }
});

Template.flight.onRendered(function () {
  twttr.widgets.load();
});
