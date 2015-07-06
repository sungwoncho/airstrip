Router.route('/newsletter/preview', {
  where: 'server',
  action: function () {
    var flight = Flights.findOne({}, {sort: {date: -1}, limit: 1});
    var campaign = campaignFactory.build(flight);

    this.response.write(campaign.html);
    this.response.end();
  }
});
