Meteor.publish('dates', function () {
  return Dates.find();
});
