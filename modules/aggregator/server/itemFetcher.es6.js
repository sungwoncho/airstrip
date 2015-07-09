var FeedParser = Meteor.npmRequire('feedparser');
var Readable = Meteor.npmRequire('stream').Readable;

var today = moment().utc().format('YYYYMMDD');
var itemLimitPerFlight = 10;

ItemFetcher = {
  fetch: function () {
    // Create a flight if no flight exists for today
    console.log('creating a flight for ' + today + '...');
    if (Flights.find({date: today}).count() === 0) {
      Meteor.call('createFlight', {date: today, itemIds: []});
      console.log('flight created successfully.');
    }

    Feeds.find({}, {sort: {position: 1}}).forEach(function (feed) {
      var RawRSS = HTTP.get(feed.url).content;
      handleFeed(RawRSS, feed);
    });

    var latestFlight = Flights.findOne({}, {sort: {number: -1}, limit: 1});
    Tweet.postForFlight(latestFlight);
  }
};

var getStream = function (content) {
  var stream = new Readable();
  stream._read = function() {}; // Set it to no-op in order to push to stream.

  stream.push(content);
  return stream;
};

var handleFeed = function (rawContent, feed) {
  var feedParser = new FeedParser(),
      stream = getStream(rawContent);

  stream.pipe(feedParser);

  feedParser.on('error', Meteor.bindEnvironment(function() {
    console.log(error);
  }));

  feedParser.on('readable', Meteor.bindEnvironment(function () {
    var stream = this,
        flight = Flights.findOne({date: today});

    while (item = stream.read()) {
      if (item.pubdate && Date.parse(item.pubdate) < moment().utc().subtract(7, 'days')) {
        console.log(`Rejecting item that is too old: \"${item.title}\" from ${feed.sourceName}`);
        return;
      }

      if (Items.find({flightId: flight._id, sourceName: feed.sourceName}).count() >= feed.dailyItemLimit) {
        console.log(`Daily item limit reached for ${feed.sourceName}`);
        return;
      }

      if (Flights.findOne({date: today}).itemIds.length >= itemLimitPerFlight) {
        console.log(`Item limit per flight of ${itemLimitPerFlight} reached.`);
        return;
      }

      var newItem = {
        title: item.title,
        url: item.link,
        guid: item.guid || item.link,
        sourceName: feed.sourceName,
        sourceUrl: feed.sourceUrl,
        sourceType: feed.sourceType,
        author: item.author,
        publishedDate: item.pubdate
      };

      Meteor.call('createItem', newItem, today);
    }
  }, function (error) {
    console.log('Error occurred: ' + error);
  }, feedParser));
};

// a convenience method to trigger and test fetch in browser console
Meteor.methods({
  allWeNeedIsFetch: function () {
    ItemFetcher.fetch();
  }
});
