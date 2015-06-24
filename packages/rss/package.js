Package.describe({
  name: 'rss',
  version: '0.0.1',
  documentation: 'README.md'
});

Npm.depends({
  'feedparser': '1.1.3',
  'twit': '1.1.20',
  'sinon': '1.15.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'http',
    'percolatestudio:synced-cron'
  ], 'server');

  api.addFiles([
    'server/cron.js',
    'server/fetch_feeds.js',
    'server/lib/start.js',
    'server/tweet.js'
  ], 'server');

  api.export('PostTweetForFlight');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('rss');
  api.addFiles([
    'tests/tweet_test.js'
  ], 'server');
});
