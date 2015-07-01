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
    Flights.update({items: {$exists: true}}, {$unset: {items: ''}}, {multi: true});
  },
  down: function () {

  }
});

Migrations.migrateTo('latest');
