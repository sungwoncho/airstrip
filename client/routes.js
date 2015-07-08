Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onRun(function () {
  analytics.page();
  this.next();
});
