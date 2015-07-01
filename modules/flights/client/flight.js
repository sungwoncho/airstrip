Template.flight.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}, limit: 4});
  },

  itemCount: function () {
    return Items.find({'hidden': false}).count();
  },

  sources: function () {
    var items = Items.find({'hidden': false}).fetch();
    var sources = _.pluck(items, 'source');
    var uniqSources = _.uniq(sources);
    return uniqSources;
  },

  items: function () {
    return Items.find({'hidden': false, flightId: this._id});
  }
});

Template.flight.onRendered(function () {
  twttr.widgets.load();
});
