Template.footer.events({
  'click .blog-link': function () {
    analytics.track('Visited blog');
  }
});
