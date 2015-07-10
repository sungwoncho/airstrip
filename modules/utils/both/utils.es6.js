Utils = {};

Utils.buildShortUrl = function (item) {
  return Meteor.absoluteUrl(`i/${item.shortLink}`);
};

Utils.sortByViewedCount = function (items) {
  var itemIds = _.pluck(items, '_id');

  var viewStats = ViewStats.find({itemId: {$in: itemIds}}, {sort: {viewCount: -1}}).fetch();
  var sortedItems = viewStats.map(function (viewStat) {
    return Items.findOne(viewStat.itemId);
  });

  return sortedItems;
};

Utils.dateStringToDate = function (dateString) {
  var year = dateString.substring(0,4);
  var month = dateString.substring(4,6);
  var day = dateString.substring(6,8);

  return new Date(`${year},${month-1},${day}`);
};

Utils.getItemsForFlight = function (flight) {
  return Items.find({'hidden': false, flightId: flight._id});
};

Utils.getSourceList = function (flight) {
  var items = Utils.getItemsForFlight(flight).fetch();
  var sources = _.pluck(items, 'sourceUrl');
  var uniqSources = _.uniq(sources);
  return uniqSources;
};
