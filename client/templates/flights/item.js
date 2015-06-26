Template.item.helpers({
  sourceBadgeUrl: function () {
    if (this.source === 'nomadlist.com' || this.source === 'nomadforum.io') {
      return '/images/nomadlist-badge.png';
    } else if (this.source === 'www.reddit.com') {
      return '/images/reddit-badge.png';
    } else {
      return '/images/blog-badge.png';
    }
  },

  hostUrl: function () {
    var fullUrl = document.createElement('a');
    fullUrl.href = this.url;

    return fullUrl.hostname;
  }
});

Template.item.events({
  'click .hide-item': function (e) {
    e.preventDefault();

    Meteor.call('hideItem', this.guid);
  },

  'click .item-link': function (e, tpl) {
    analytics.track('Clicked an item', {
      itemGuid: this.guid
    });
  }
});
