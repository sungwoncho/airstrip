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
