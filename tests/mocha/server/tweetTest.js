var expect = chai.expect;

MochaWeb.testOnly(function(){
  beforeEach(function () {
    Items.remove();
    Flights.remove();
  });

  describe("Tweet", function(){
    describe("postForFlight", function(){
      it("posts a tweet", function(){
        var mock = sinon.mock(Tweet.twitterAPI);
        mock.expects('post').once();
        Tweet.postForFlight({number:1 , date: '20150601'});

        mock.verify();
      });
    });

    describe("pickItemForTweet", function(){
      it("returns an item that is not tweeted", function(){
        var flight = Factory.create('flight');
        var tweetedItem = Factory.create('item', {tweeted: true, flightId: flight._id});
        var untweetedItem = Factory.create('item', {tweeted: false, flightId: flight._id});

        var result = Tweet.pickItemForTweet(flight);
        expect(result._id).to.equal(untweetedItem._id);
      });
    });

    describe("postForItem", function(){
      it("posts a tweet", function(){
        // setup
        var flight = Factory.create('flight');
        var item = Factory.create('item', {flightId: flight._id});

        // execute
        var mock = sinon.mock(Tweet.twitterAPI);
        mock.expects('post').once();
        Tweet.postForItem(item);

        // verify
        mock.verify();
      });
    });
  });

  describe("MessageFactory", function(){
    describe("buildForItem", function(){
      it("returns a string", function(){
        var item = Factory.build('item');
        expect(MessageFactory.buildForItem(item)).to.be.a('string');
      });
    });

    describe("buildForFlight", function(){
      it("returns a string", function(){
        var flight = Factory.build('flight');
        expect(MessageFactory.buildForFlight(flight)).to.be.a('string');
      });
    });
  });
});
