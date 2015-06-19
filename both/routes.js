Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'flights',
  waitOn: function () {
    return [Meteor.subscribe('flights')];
  }
});
