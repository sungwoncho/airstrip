var htmlToText = Meteor.npmRequire('html-to-text');
var juice = Meteor.npmRequire('juice');

campaignFactory = {
  buildDaily: function (flight) {
    var items = itemPicker.pickDailyBest(flight);
    var today = moment().format('YYYY/MM/DD');

    SSR.compileTemplate('dailyDigest', Assets.getText('newsletter/dailyDigest.html'));
    var html = SSR.render('dailyDigest', {flight: flight, items: items, logoUrl: Meteor.absoluteUrl('images/logo.png')});
    var inlinedHtml = juice(html);

    var campaign = {
      html: inlinedHtml,
      text: htmlToText.fromString(inlinedHtml),
      subject: '[airstrip] Nomad stories digest for ' + today
    };

    return campaign;
  },

  buildWeekly: function () {
    var redditItems = weeklyItemPicker.pickReddit();
    var nomadForumItems = weeklyItemPicker.pickNomadForum();
    var blogItems = weeklyItemPicker.pickBlog();
    var podcastItems = weeklyItemPicker.pickPodcast();

    SSR.compileTemplate('weeklyDigest', Assets.getText('newsletter/weeklyDigest.html'));
    var html = SSR.render('weeklyDigest', {
      redditItems: redditItems,
      nomadForumItems: nomadForumItems,
      blogItems: blogItems,
      podcastItems: podcastItems,
      logoUrl: Meteor.absoluteUrl('images/logo.png'),
      redditLogoUrl: Meteor.absoluteUrl('images/redditBadge.png'),
      nomadForumLogoUrl: Meteor.absoluteUrl('images/nomadlistBadge.png'),
      blogLogoUrl: Meteor.absoluteUrl('images/blogBadge.png'),
      startDate: moment().subtract(7, 'days').format('YYYY/MM/DD'),
      endDate: moment().format('YYYY/MM/DD')
    });
    var inlinedHtml = juice(html);

    var campaign = {
      html: inlinedHtml,
      text: htmlToText.fromString(inlinedHtml),
      subject: '[airstrip] Nomad stories weekly digest'
    };

    return campaign;
  }
};
