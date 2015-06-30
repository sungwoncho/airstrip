var expect = chai.expect;

MochaWeb.testOnly(function(){
  describe("Tweet", function(){
    describe("postForFlight", function(){
      it("posts a tweet", function(){
        var mock = sinon.mock(Tweet.twitterAPI);
        mock.expects('post').once();
        Tweet.postForFlight({number:1 , date: '20150601'});

        mock.verify();
      });
    });
  });
});
