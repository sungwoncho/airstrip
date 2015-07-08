itemPicker = {
  pickDailyBest: function (flight) {
    return Items.find({flightId: flight._id}, {limit: 5}).fetch();
  }
};

weeklyItemPicker = {
  pickReddit: function () {
    return this.pick({sourceName: 'Reddit'});
  },

  pickNomadForum: function () {
    return this.pick({sourceName: 'NomadForum'});
  },

  pickBlog: function () {
    return this.pick({sourceType: 'blog'});
  },

  pickPodcast: function () {
    return this.pick({sourceType: 'podcast'});
  },

  pick: function (options) {
    var flights = this.getFlightsForWeek();
    var searchOption = _.extend({flightId: {$in: _.pluck(flights, '_id')}}, options);
    var items = Items.find(searchOption).fetch();
    var itemIds = _.pluck(items, '_id');

    var viewStats = ViewStats.find({itemId: {$in: itemIds}}, {sort: {viewCount: -1}, limit: 4}).fetch();
    var sortedItems = viewStats.map(function (viewStat) {
      return Items.findOne(viewStat.itemId);
    });

    return sortedItems;
  },

  getFlightsForWeek: function () {
    var startDate = moment().subtract(7, 'days').format('YYYYMMDD');
    return Flights.find({date: {$gte: startDate}}).fetch();
  }
};
