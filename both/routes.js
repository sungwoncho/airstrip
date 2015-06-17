Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'dates',
  waitOn: function () {
    return [Meteor.subscribe('dates')];
  }
});
