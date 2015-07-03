Template.item.helpers({
  sourceBadgeUrl: function () {
    var fileName = this.sourceName.toLowerCase().replace(/ -/g,"_");

    if (_.contains(['nomadlist', 'nomadlist - story', 'nomadforum'], fileName)) {
      return '/images/nomadlistBadge.png';
    } else if (fileName == 'reddit') {
      return '/images/redditBadge.png';
    }

    return `/images/${this.sourceType}Badge.png`;
  },

  hostUrl: function () {
    var fullUrl = document.createElement('a');
    fullUrl.href = this.url;

    return fullUrl.hostname;
  }
});

Template.item.events({
  'click .item-link': function (e, tpl) {
    analytics.track('Clicked an item', {
      itemGuid: this.guid
    });
  }
});
