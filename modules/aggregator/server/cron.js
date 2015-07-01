SyncedCron.add({
  name: 'Fetch RSS feeds and write feed in db',
  schedule: function (parser) {
    return parser.text('at 8:00 am');
  },
  job: function () {
    ItemFetcher.fetch();
  }
});

SyncedCron.add({
  name: 'Tweet a story',
  schedule: function (parser) {
    return parser.text('every 4 hours');
  },
  job: function () {
    var latestFlight = Flights.findOne({}, {sort: {date: -1}, limit: 1});
    var item = Tweet.pickItemForTweet(latestFlight);

    Tweet.postForItem(item);
  }
});
