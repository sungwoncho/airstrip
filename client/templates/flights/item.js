Template.item.helpers({
  sourceBadgeUrl: function () {
    if (this.source === 'nomadlist.com' || this.source === 'nomadforum.io') {
      return 'images/nomadlist-badge.png';
    } else if (this.source === 'www.reddit.com') {
      return 'images/reddit-badge.png';
    } else {
      return 'images/blog-badge.png';
    }
  },

  hostUrl: function () {
    var fullUrl = document.createElement('a');
    fullUrl.href = this.url;

    return fullUrl.hostname;
  }
});
