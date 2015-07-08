Utils = {};

Utils.buildShortUrl = function (item) {
  return Meteor.absoluteUrl(`i/${item.shortLink}`);
};
