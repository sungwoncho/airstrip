var htmlToText = Meteor.npmRequire('html-to-text');
var juice = Meteor.npmRequire('juice');

campaignFactory = {
  build: function (flight) {
    var items = this.pickItemsForCampaign(flight);
    var today = moment().format('YYYY/MM/DD');

    SSR.compileTemplate('emailDigest', Assets.getText('newsletter/emailDigest.html'));
    var html = SSR.render('emailDigest', {flight: flight, items: items, logoUrl: Meteor.absoluteUrl('images/logo.png')});
    var inlinedHtml = juice(html);

    var campaign = {
      html: inlinedHtml,
      text: htmlToText.fromString(inlinedHtml),
      subject: '[airstrip] Nomad stories digest for ' + today
    };

    return campaign;
  },

  pickItemsForCampaign: function (flight) {
    return Items.find({flightId: flight._id}, {limit: 5}).fetch();
  }
};
