getShownItems = function (flight) {
  var shownItems = _.filter(flight.items, function (item) {
    return item.hidden === false;
  });

  return shownItems;
};

Template.flight.helpers({
  recentFlights: function () {
    return Flights.find({}, {sort: {date: -1}});
  },

  itemCount: function () {
    return getShownItems(this).length;
  },

  sources: function () {
    var sources = _.pluck(getShownItems(this), 'source');
    var uniqSources = _.uniq(sources);
    return uniqSources;
  }
});


Template.flight.onRendered(function () {
  twttr.widgets.load();
});
