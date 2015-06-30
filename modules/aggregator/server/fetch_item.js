var FeedParser = Meteor.npmRequire('feedparser');
var Url = Meteor.npmRequire('url');
var Readable = Meteor.npmRequire('stream').Readable;

var feedUrls = [
  'http://reddit.com/r/digitalnomad/hot.rss',
  'https://www.kimonolabs.com/api/rss/35ba3k2q?apikey=9es3t0vNc6vORrj0s4C6skHz6m4tYfIN', //nomadforum-new
  'https://nomadlist.com/stories/feed',
  'http://www.hoboceo.com/feed/',
  'https://levels.io/feed/',
  'http://joel.is/',
  'http://www.tropicalmba.com/feed/'
];

var streamGetter = function (content) {
  var stream = new Readable();
  stream._read = function() {}; // Set it to no-op in order to push to stream.

  stream.push(content);
  return stream;
};

var handleFeed = function (rawContent) {
  var feedParser = new FeedParser(),
      stream = streamGetter(rawContent),
      today = moment().format('YYYYMMDD');

  // If flight not exist, make one.
  if (Flights.find({date: today}).count() === 0) {
    Meteor.call('createFlight', {date: today, items: []});
  }

  stream.pipe(feedParser);

  feedParser.on('error', function (error) {
    console.log(error);
  });

  feedParser.on('readable', Meteor.bindEnvironment(function () {
    var stream = this,
    item = stream.read();

    var newItem = {
      title: item.title,
      url: item.link,
      guid: item.guid || item.link,
      author: item.author,
      source: getSourceFromLink(item.link),
      hidden: false
    };

    // If item already exists, do not update
    if (!!Flights.findOne({'items.guid': item.guid})) {
      console.log(item.title + ': already exists.');
    } else {
      Flights.update({date: today}, {$addToSet: {items: newItem}});
    }

  }, function (error) {
    console.log('Could not bind environment. ERROR: ' + error);
  }, feedParser));
};

var getSourceFromLink = function (link) {
  var parsedUrl = Url.parse(link);
  return parsedUrl.host;
};

ItemFetcher = {
  fetch: function () {
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
