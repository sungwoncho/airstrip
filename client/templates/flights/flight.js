Template.flight.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}});
  },

  itemCount: function () {
    return this.items.length;
  },

  sources: function () {
    var sources = _.pluck(this.items, 'source');
    var uniqSources =_.uniq(sources);
    return uniqSources;
  }
});
