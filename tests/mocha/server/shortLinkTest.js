var expect = chai.expect;

MochaWeb.testOnly(function () {
  beforeEach(function () {
    Items.remove({});
    ViewStats.remove({});
  });

  describe("shortLinkFactory", function(){
    describe("build", function(){
      it("returns an alphanumeric string of 6 length", function(){
        var result = shortLinkFactory.build();
        expect(result).to.be.a('string');
        expect(result).to.have.length(6);
      });
    });
  });

  describe("/i/:shortLink", function(){
    it("redirects to the item url", function(){
      var item = Factory.create('item');
      var viewStats = Factory.create('viewStat', {itemId: item._id});
      var requestUrl = Meteor.absoluteUrl('i/' + item.shortLink);
      var response = HTTP.get(requestUrl, {followRedirects: false});

      expect(response.statusCode).to.equal(302);
      expect(response.headers.location).to.equal(item.url);
    });

    it("tries to increment the viewCount", function(){
      // Setup
      spies.create('method', Meteor, 'call');

      var item = Factory.create('item');
      var viewStats = Factory.create('viewStat', {itemId: item._id});
      var requestUrl = Meteor.absoluteUrl('i/' + item.shortLink);

      // Execute
      HTTP.get(requestUrl, {followRedirects: false});

      // Verify
      expect(spies.method).to.have.been.calledWith('incrementViewCount');

      // Teardown
      spies.restoreAll();
    });
  });
});
