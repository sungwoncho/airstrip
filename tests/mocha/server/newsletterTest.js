var expect = chai.expect;

MochaWeb.testOnly(function(){
  beforeEach(function () {
    Flights.remove({});
    Items.remove({});
  });

  afterEach(function () {
    stubs.restoreAll();
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
        // Setup
        stubs.create('createCampaign', newsletterScheduler, 'createCampaign');
        stubs.createCampaign.returns({id: 1});

        var mailchimpCall = sinon.spy();
        stubs.create('mailchimpAPI', newsletterScheduler, 'mailchimpAPI');
        stubs.mailchimpAPI.returns({call: mailchimpCall});

        // Execute
        var campaign;
        newsletterScheduler.schedule(campaign);

        // Verify
        expect(mailchimpCall).to.have.been.calledWith('campaigns', 'schedule');

        // Teardown
        stubs.restoreAll();
      });
    });

    describe("createCampaign", function(){
      it("creates a campaign", function(){
        // Setup
        var flight = Factory.create('flight');
        Factory.create('item', {flightId: flight._id});
        var campaign = campaignFactory.build(flight);

        // Hack to resolve Async.runSync
        var mailchimpCall = sinon.spy(function (done) {
          done();
        });

        stubs.create('mailchimpAPI', newsletterScheduler, 'mailchimpAPI');
        stubs.mailchimpAPI.returns({call: mailchimpCall});

        // Execute
        newsletterScheduler.createCampaign(campaign);

        // Verify
        expect(mailchimpCall).to.have.been.calledWith('campaigns', 'create');

        // Teardown
        stubs.restoreAll();
      });
    });
  });
});
