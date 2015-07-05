// TODO: Class-ical implementation of ItemFetcher
ItemFetcher = class ItemFetcher {
  constructor() {
  }

  fetch() {
    var feeds = Feeds.find();

    if (Flights.find({date: today}).count() === 0) {
      Meteor.call('createFlight', {date: today, itemIds: []});
    }
  }

  fetchAndTweet() {
    this.fetch();

  }
};
