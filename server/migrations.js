Migrations.add({
  version: 1,
  name: "Extract items to a separate collection from the nested field",
  up: function () {
    Flights.find({items: {$exists: true}}).forEach(function (flight) {
      flight.items.forEach(function (item) {
        var itemId = Items.insert(_.extend(item, {createdAt: new Date(), flightId: flight._id}));
        Flights.update({_id: flight._id}, {$addToSet: {itemIds: itemId}});
      });
    });
  },
  down: function () {
  }
});

Migrations.add({
  version: 2,
  name: "Drop items field",
  up: function () {
    Flights.update({items: {$exists: true}}, {$unset: {items: ''}}, {multi: true, validate: false});
  },
  down: function () {
  }
});

Migrations.add({
  version: 3,
  name: "Add tweeted field to items",
  up: function () {
    Items.update({tweeted: {$exists: false}}, {$set: {tweeted: false}}, {multi: true});
  },
  down: function () {
    Items.update({tweeted: {$exists: true}}, {$unset: {tweeted: ''}}, {multi: true});
  }
});

Migrations.add({
  version: 4,
  name: "Add shortLink field to items",
  up: function () {
    Items.find({shortLink: {$exists: false}}).forEach(function (item) {
      Items.update(item._id, {$set: {shortLink: shortLinkFactory.build()}});
    });
  },
  down: function () {
    Items.update({shortLink: {$exists: true}}, {$unset: {shortLink: ''}});
  }
});

Migrations.add({
  version: 5,
  name: "Create viewStat record for items",
  up: function () {
    Items.find().forEach(function (item) {
      if (!!!ViewStats.findOne({itemId: item._id})) {
        ViewStats.insert({itemId: item._id, viewCount: 0, createdAt: new Date()});
      }
    });
  },
  down: function () {
    ViewStats.remove({});
  }
});

Migrations.migrateTo('latest');
