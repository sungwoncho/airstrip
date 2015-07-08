Router.route('/newsletter/preview/daily', {
  where: 'server',
  action: function () {
    var flight = Flights.findOne({}, {sort: {date: -1}, limit: 1});
    var campaign = campaignFactory.buildDaily(flight);

    this.response.write(campaign.html);
    this.response.end();
  }
});

Router.route('/newsletter/preview/weekly', {
  where: 'server',
  action: function () {
    var campaign = campaignFactory.buildWeekly();

    this.response.write(campaign.html);
    this.response.end();
  }
});
