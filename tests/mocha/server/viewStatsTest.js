var expect = chai.expect;

MochaWeb.testOnly(function () {
  beforeEach(function () {
    ViewStats.remove({});
  });

  describe("incrementViewCount", function(){
    it("increments the viewCount and add clientIP to viewedIPs", function(){
      // Setup
      var viewStat = Factory.create('viewStat');

      // Execute
      Meteor.call('incrementViewCount', viewStat.itemId, '192.292.191.292');

      // Verify
      var viewStatReloaded = ViewStats.findOne(viewStat._id);
      expect(viewStatReloaded.viewCount).to.equal(1);
      expect(viewStatReloaded.viewedIPs).to.include('192.292.191.292');
    });

    it("does not increment the viewCount if client already viewed the item", function(){
      // Setup
      var viewStat = Factory.create('viewStat', {viewCount: 1, viewedIPs: ['192.292.191.292']});

      // Execute
      Meteor.call('incrementViewCount', viewStat.itemId, '192.292.191.292');

      // Verify
      var viewStatReloaded = ViewStats.findOne(viewStat._id);
      expect(viewStatReloaded.viewCount).to.equal(1);
    });
  });
});
