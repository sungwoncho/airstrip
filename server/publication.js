Meteor.publish('recent-flights', function (options) {
  var limit = options ? options.limit : 5;
  return Flights.find({}, {sort: {date: -1}, limit: limit});
});

Meteor.publish('all-flights', function () {
  return Flights.find();
});

Meteor.publish('flight', function (date) {
  return Flights.find({date: date});
});

Meteor.publish('userData', function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'isAdmin': 1}});
});
