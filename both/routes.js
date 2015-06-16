Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'feeds',
  waitOn: function () {
    return [Meteor.subscribe('feeds')];
  }
});
