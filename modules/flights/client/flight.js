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
    var sources = _.pluck(items, 'sourceUrl');
    var uniqSources = _.uniq(sources);
    return uniqSources.map(function (uniqSource) {
      return uniqSource.replace(/.*?:\/\//g, ""); // Get rid of http:// or https://
    });
  },

  items: function () {
    return getItemsForFlight(this);
  }
});

Template.flight.onRendered(addTwitterWidget);
var addTwitterWidget = function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
