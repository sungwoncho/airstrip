var expect = chai.expect;

MochaWeb.testOnly(function(){
  describe("sortByViewedCount", function(){
    it("sorts given items in a descending order of viewCount", function(){
      // Setup
      var item1 = Factory.create('item', {title: 'item1'});
      var item2 = Factory.create('item', {title: 'item2'});
      var item3 = Factory.create('item', {title: 'item3'});

      Factory.create('viewStat', {itemId: item1._id, viewCount: 10});
      Factory.create('viewStat', {itemId: item2._id, viewCount: 5});
      Factory.create('viewStat', {itemId: item3._id, viewCount: 15});

      // Execute
      var items = [item1, item2, item3];
      var result = Utils.sortByViewedCount(items);

      // Verify
      expect(result[0]._id).to.equal(item3._id);
      expect(result[1]._id).to.equal(item1._id);
      expect(result[2]._id).to.equal(item2._id);

      // Teardown
      Items.remove();
      ViewStats.remove();
    });
  });
});
