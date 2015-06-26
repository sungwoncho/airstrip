var FeedParser = Npm.require('feedparser');
var Url = Npm.require('url');
var Readable = Npm.require('stream').Readable;

var feedUrls = [
  'http://reddit.com/r/digitalnomad/hot.rss',
  'https://www.kimonolabs.com/api/rss/3f5jp576?apikey=9es3t0vNc6vORrj0s4C6skHz6m4tYfIN',
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

ItemFetcher = {
  fetch: function () {
    feedUrls.forEach(function (feedUrl) {
      var rssContent = HTTP.get(feedUrl).content;
      ItemFetcher._handleFeed(rssContent);
    });

    var latestFlight = Flights.findOne({}, {sort: {number: -1}, limit: 1});
    PostTweetForFlight.post(latestFlight);
  },

  _handleFeed: function (rawContent) {
    var feedParser = new FeedParser(),
        stream = streamGetter(rawContent);

    stream.pipe(feedParser);

    feedParser.on('error', function (error) {
      console.log(error);
    });

    feedParser.on('readable', Meteor.bindEnvironment(function () {
      var stream = this,
          today = moment().format('YYYYMMDD');

      // If flight not exist, make one.
      if (Flights.find({date: today}).count() === 0) {
        Meteor.call('addFlight', {date: today, items: []});
      }

      while (item = stream.read()) {
        var newItem = {
          title: item.title,
          url: item.link,
          guid: item.guid || item.link,
          author: item.author,
          source: ItemFetcher._getSourceFromLink(item.link),
          hidden: false
        };

        // If item already exists, do not update
        if (!!Flights.findOne({'items.guid': item.guid})) {
          console.log(item.title + ': already exists.');
        } else {
          Flights.update({date: today}, {$addToSet: {items: newItem}});
        }
      }

    }, function (error) {
      console.log('Could not bind environment. ERROR: ' + error);
    }, feedParser));
  },

  _getSourceFromLink: function (link) {
    var parsedUrl = Url.parse(link);
    return parsedUrl.host;
  }
};

// a convenience method to trigger and test fetch in browser console
Meteor.methods({
  allWeNeedIsFetch: function () {
    ItemFetcher.fetch();
  }
});
