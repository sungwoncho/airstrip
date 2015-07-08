SyncedCron.add({
  name: 'Schedule a weekly digest',
  schedule: function (parser) {
    return parser.text('at 7:00 am on Sat');
  },
  job: function () {
    Meteor.call('scheduleWeeklyDigest');
  }
});
