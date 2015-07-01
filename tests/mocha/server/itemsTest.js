var expect = chai.expect;

MochaWeb.testOnly(function () {
  beforeEach(function () {
    Items.remove({});
    Flights.remove({});
  });

  describe("createItem method", function(){
    it("creates an item", function(){
      // Setup
      Factory.create('flight', {date: '20150630'});
      var newItem = Factory.build('item');

      // Execute
      Meteor.call('createItem', newItem, '20150630');

      // Verify
      expect(Items.find().count()).to.equal(1);
      var flight = Flights.findOne();
      var item = Items.findOne();
      expect(item.flightId).to.equal(flight._id);
      expect(flight.itemIds[0]).to.equal(item._id);
    });

    it("does not create item if duplicate exists", function(){
      var item = Factory.create('item');
      var newItem = Factory.build('item');

      Meteor.call('createItem', newItem, '20150630');
      expect(Items.find().count()).to.eq(1);
    });
  });

  describe("toggleHidden method", function(){
    it("toggles hidden field's value", function(){
      var item = Factory.create('item');
      Meteor.call('toggleHidden', item._id);

      var itemReloaded = Items.findOne(item._id);
      expect(itemReloaded.hidden).to.eq(true);

      Meteor.call('toggleHidden', item._id);
      var itemReloaded2 = Items.findOne(item._id);
      expect(itemReloaded2.hidden).to.eq(false);
    });
  });

  describe("removeItem method", function(){
    it("deletes the item and removes the id from the flight's itemIds", function(){
      var item = Factory.create('item');
      Factory.create('flight', {itemIds: [item._id]});
      Meteor.call('removeItem', item._id);

      expect(Items.find().count()).to.eq(0);

      var flight = Flights.findOne();
      expect(flight.itemIds.length).to.eq(0);
    });
  });
});
