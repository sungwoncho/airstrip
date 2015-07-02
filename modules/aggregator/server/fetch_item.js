var FeedParser = Meteor.npmRequire('feedparser');
var Url = Meteor.npmRequire('url');
var Readable = Meteor.npmRequire('stream').Readable;

var streamGetter = function (content) {
  var stream = new Readable();
  stream._read = function() {}; // Set it to no-op in order to push to stream.

  stream.push(content);
  return stream;
};

var handleFeed = function (rawContent) {
  var feedParser = new FeedParser(),
      stream = streamGetter(rawContent);

  stream.pipe(feedParser);

  feedParser.on('error', function (error) {
    console.log(error);
  });

  feedParser.on('readable', Meteor.bindEnvironment(function () {
    var stream = this,
        item = stream.read(),
        today = moment().format('YYYYMMDD');

    var newItem = {
      title: item.title,
      url: item.link,
      guid: item.guid || item.link,
      source: getSourceFromLink(item.link),
      author: item.author,
      createdAt: new Date()
    };

    Meteor.call('createItem', newItem, today);

  }, function (error) {
    console.log('Error occurred: ' + error);
  }, feedParser));
};

var getSourceFromLink = function (link) {
  var parsedUrl = Url.parse(link);
  return parsedUrl.host;
};

ItemFetcher = {
  fetch: function () {
    var today = moment().format('YYYYMMDD'),
        feedUrls = Feeds.find().map(function (feed) {
          return feed.url;
        });

    if (Flights.find({date: today}).count() === 0) {
      Meteor.call('createFlight', {date: today, itemIds: []});
    }

    feedUrls.forEach(function (feedUrl) {
      var rssContent = HTTP.get(feedUrl).content;
      handleFeed(rssContent);
    });

    var latestFlight = Flights.findOne({}, {sort: {number: -1}, limit: 1});
    Tweet.postForFlight(latestFlight);
  }
};

// a convenience method to trigger and test fetch in browser console
Meteor.methods({
  allWeNeedIsFetch: function () {
    ItemFetcher.fetch();
  }
});
