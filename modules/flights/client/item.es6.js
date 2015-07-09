Template.item.helpers({
  sourceBadgeUrl: function () {
    var fileName = this.sourceName.toLowerCase().replace(/ -/g,"_");

    if (_.contains(['nomadlist', 'nomadlist - story', 'nomadforum'], fileName)) {
      return '/images/nomadlistBadge.png';
    } else if (fileName === 'reddit') {
      return '/images/redditBadge.png';
    }

    return `/images/${this.sourceType}Badge.png`;
  },

  pubDate: function () {
    if (this.publishedDate) {
      var rawDate = Date.parse(this.publishedDate);
      var formattedDate = moment(rawDate).format('MMMM DD');

      return `on ${formattedDate}`;
    }
  }
});

Template.item.events({
  'click .item-link': function (e, tpl) {
    analytics.track('Clicked an item', {
      itemGuid: this.guid
    });
  }
});
