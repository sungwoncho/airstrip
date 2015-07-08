var randToken = Meteor.npmRequire('rand-token');

shortLinkFactory = {
  build: function () {
    var shortLink = randToken.generate(6);
    while (Items.find({shortLink: shortLink}).count() > 0) {
      shortLink = randToken.generate(6);
    }

    return shortLink;
  }
};
