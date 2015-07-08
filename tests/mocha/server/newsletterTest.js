var expect = chai.expect;

MochaWeb.testOnly(function(){
  beforeEach(function () {
    Flights.remove({});
    Items.remove({});
  });

  afterEach(function () {
    stubs.restoreAll();
  });

  describe("campaignFactory.buildDaily", function(){
    it("builds and returns campaign with correct attributes", function(){
      var flight = Factory.create('flight');
      Factory.create('item', {flightId: flight._id, title: 'example1'});
      Factory.create('item', {flightId: flight._id, title: 'example2'});
      Factory.create('item', {flightId: flight._id, title: 'example3'});

      var result = campaignFactory.buildDaily(flight);

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

    // describe("createCampaign", function(){
    //   it("creates a campaign", function(){
    //     // Setup
    //     var flight = Factory.create('flight');
    //     Factory.create('item', {flightId: flight._id});
    //     var campaign = campaignFactory.buildDaily(flight);
    //
    //     // Hack to resolve Async.runSync
    //     var mailchimpCall = sinon.spy(function (done) {
    //       done(null, null);
    //     });
    //
    //     stubs.create('mailchimpAPI', newsletterScheduler, 'mailchimpAPI');
    //     stubs.mailchimpAPI.returns({call: mailchimpCall});
    //
    //     // Execute
    //     newsletterScheduler.createCampaign(campaign);
    //
    //     // Verify
    //     expect(mailchimpCall).to.have.been.calledWith('campaigns', 'create');
    //
    //     // Teardown
    //     stubs.restoreAll();
    //   });
    // });
  });

  describe("weeklyItemPicker", function(){
    describe("pickReddit", function(){
      it("returns the Reddit items of the past week in the order of viewCount", function(){
        // Setup
        var flight1 = Factory.create('flight', {date: moment().subtract(3, 'days').format('YYYYMMDD')});
        var flight2 = Factory.create('flight', {date: moment().subtract(4, 'days').format('YYYYMMDD')});
        var flight3 = Factory.create('flight', {date: moment().subtract(5, 'days').format('YYYYMMDD')});

        var item1 = Factory.create('item', {title: 'item1', flightId: flight1._id, sourceName: 'Reddit'});
        var item2 = Factory.create('item', {title: 'item2', flightId: flight2._id, sourceName: 'Reddit'});
        var item3 = Factory.create('item', {title: 'item3', flightId: flight3._id, sourceName: 'Reddit'});
        Factory.create('item', {title: 'item3', flightId: flight3._id, sourceName: 'RandomSource'});

        Factory.create('viewStat', {itemId: item1._id, viewCount: 10});
        Factory.create('viewStat', {itemId: item2._id, viewCount: 5});
        Factory.create('viewStat', {itemId: item3._id, viewCount: 15});

        // Execute
        var result = weeklyItemPicker.pickReddit();

        // Verify
        expect(result.length).to.equal(3);
        expect(result[0]._id).to.equal(item3._id);
        expect(result[1]._id).to.equal(item1._id);
        expect(result[2]._id).to.equal(item2._id);

        // Teardown
        Flights.remove();
        Items.remove();
        ViewStats.remove();
      });
    });
  });
});
