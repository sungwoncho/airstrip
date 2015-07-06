SyncedCron.add({
  name: 'Schedule a daily digest',
  schedule: function (parser) {
    return parser.text('at 10:00 am');
  },
  job: function () {
    var latestFlight = Flights.findOne({}, {sort: {date: -1}, limit: 1});

    var campaign = campaignFactory.build(latestFlight);
    newsletterScheduler.schedule(campaign);
  }
});
