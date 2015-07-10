Template.flight.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}, limit: 4});
  },

  itemCount: function () {
    return Utils.getItemsForFlight(this).count();
  },

  sources: function () {
    return Utils.getSourceList(this);
  },

  prettySource: function (source) {
    return source.replace(/.*?:\/\//g, "");
  },

  items: function () {
    return Utils.getItemsForFlight(this);
  }
});

Template.flight.onRendered(function () {
  twttr.widgets.load();
});
