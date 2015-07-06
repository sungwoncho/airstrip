var htmlToText = Meteor.npmRequire('html-to-text');

campaignBuilder = {
  run: function (flight) {
    var items = pickItemsForCampaign(flight);
    var today = moment().format('YYYY/MM/DD');

    SSR.compileTemplate('emailDigest', Assets.getText('emailDigest.html'));
    var campaignHtml = SSR.render('emailDigest', {flight: flight, items: items});

    var campaign = {
      html: campaignHtml,
      text: htmlToText.fromString(campaignHtml),
      subject: '[airstrip] Nomad stories digest for ' + today
    };

    return campaign;
  },

  pickItemsForCampaign: function (flight) {
    return Items.find({flightId: flight._id}, {limit: 5}).fetch();
  }
};
