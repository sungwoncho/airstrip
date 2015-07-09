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
