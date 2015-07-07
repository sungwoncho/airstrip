SyncedCron.add({
  name: 'Schedule a daily digest',
  schedule: function (parser) {
    return parser.text('at 10:00 am');
  },
  job: function () {
    Meteor.call('scheduleDailyDigest');
  }
});
