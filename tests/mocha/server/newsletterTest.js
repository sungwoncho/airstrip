var expect = chai.expect;

MochaWeb.testOnly(function(){
  beforeEach(function () {
    Flights.remove({});
    Items.remove({});
  });

  describe("campaignFactory.build", function(){
    it("builds and returns campaign with correct attributes", function(){
      var flight = Factory.create('flight');
      Factory.create('item', {flightId: flight._id, title: 'example1'});
      Factory.create('item', {flightId: flight._id, title: 'example2'});
      Factory.create('item', {flightId: flight._id, title: 'example3'});

      var result = campaignFactory.build(flight);

      expect(result.html).to.include('example1');
      expect(result.html).to.include('example2');
      expect(result.html).to.include('example3');
      expect(result.text).to.match(/example1/i);
      expect(result.text).to.match(/example2/i);
      expect(result.text).to.match(/example3/i);
      expect(result.subject).to.include('[airstrip] Nomad stories digest for');
    });
  });

  describe("newsletterScheduler", function(){
    describe("schedule", function(){
      it("schedules newsletter", function(){
        var mock = sinon.mock(newsletterScheduler._mailchimpAPI);
        mock.expects('call').withArgs('campaigns', 'schedule');

        stubs.create('createCampaign', newsletterScheduler, 'createCampaign');
        stubs.createCampaign.returns({id: 1});

        var flight = Factory.create('flight');
        Factory.create('item', {flightId: flight._id, title: 'example1'});
        Factory.create('item', {flightId: flight._id, title: 'example2'});
        Factory.create('item', {flightId: flight._id, title: 'example3'});
        var campaign = campaignFactory.build(flight);

        newsletterScheduler.schedule(campaign);

        mock.verify();
      });
    });

    describe("createCampaign", function(){
      it("creates a campaign", function(){
        var mock = sinon.mock(newsletterScheduler._mailchimpAPI);
        mock.expects('call').withArgs('campaigns', 'create');

        var flight = Factory.create('flight');
        Factory.create('item', {flightId: flight._id, title: 'example1'});
        Factory.create('item', {flightId: flight._id, title: 'example2'});
        Factory.create('item', {flightId: flight._id, title: 'example3'});
        var campaign = campaignFactory.build(flight);

        newsletterScheduler.createCampaign(campaign);

        mock.verify();
      });
    });
  });
});
