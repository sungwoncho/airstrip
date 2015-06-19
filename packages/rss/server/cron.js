SyncedCron.add({
  name: 'Fetch RSS feeds and write feed in db',
  schedule: function (parser) {
    return parser.text('at 8:00 am');
  },
  job: function () {
    fetchFeeds();
  }
});
