SyncedCron.add({
  name: 'Tweet a story',
  schedule: function (parser) {
    return parser.text('every 6 hours');
  },
  job: function () {
    var latestFlight = Flights.findOne({}, {sort: {date: -1}, limit: 1});
    var item = Tweet.pickItemForTweet(latestFlight);

    Tweet.postForItem(item);
  }
});

SyncedCron.add({
  name: 'Tweet a trending story',
  schedule: function (parser) {
    return parser.text('every 10 hours');
  },
  job: function () {
    var items = Items.find({createdAt: {$gte: moment().subtract(24, 'hours').toDate()}, tweeted: false}).fetch();

    var trendingItem = Utils.sortByViewedCount(items)[0];
    Tweet.postForItem(trendingItem, 'trending');
  }
});
