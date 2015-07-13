Meteor.startup(function () {
  return SEO.config({
    title: 'airstrip.io - Nomad Stories Land Here Daily',
    meta: {
      'description': 'A smart daily aggregator of digital nomad stories, blogs, and news.'
    },
    og: {
      'type': 'website',
      'image': 'https://airstrip.io/images/logo.png',
      'site_name': 'airstrip.io'
    },
    twitter:  {
      'card': 'summary',
      'image':  'https://airstrip.io/images/logo.png',
      'site': '@airstripio',
      'creator': '@mikeswcho'
    }
  });
});
