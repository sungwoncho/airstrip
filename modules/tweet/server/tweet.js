var Twit = Meteor.npmRequire('twit');

Tweet = {
  postForFlight: function (flight) {
    var tweetMessage = MessageFactory.buildForFlight(flight);

    this.twitterAPI.post('statuses/update', {status: tweetMessage}, function (err, data, response) {
     console.log(data);
     if (err)
       console.log(err);
    });
  },

  postForItem: function (item) {
    var flightNumber = Flights.findOne(item.flightId).number;
    var tweetMessage = MessageFactory.buildForItem(item);

    this.twitterAPI.post('statuses/update', {status: tweetMessage}, Meteor.bindEnvironment(function (err, data, response) {
      if (response.statusCode === 200) {
        Items.update(item._id, {$set: {tweeted: true}});
      }
    }));
  },

  pickItemForTweet: function (flight) {
    var items = Items.find({flightId: flight._id, tweeted: false}).fetch();
    return _.sample(items);
  },

  twitterAPI: new Twit({
    consumer_key: 'kqAQtrale59wg7ymyppxnNQYY',
    consumer_secret: Meteor.settings.twitterConsumerSecret,
    access_token: '3244714110-yatEahozepvmYNPIp7ODzjzS2MCYeG57D0QC6q1',
    access_token_secret: Meteor.settings.twitterAccessTokenSecret
  })
};
