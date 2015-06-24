var Sinon = Npm.require('sinon');

Tinytest.add('twitterAPI is called', function (test) {
  var mock = Sinon.mock(PostTweetForFlight.twitterAPI)
                  .expects('post')
                  .withArgs('statuses/update');

  var flight = { number: 1 };

  PostTweetForFlight.post(flight);
  test.equal(mock.verify(), true);
});
