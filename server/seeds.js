Meteor.startup(function () {
  if (Feeds.find().count() == 0) {
    [
      {
        title: 'Just arrived here in Chicago',
        source: 'reddit',
        url: '#',
        author: 'yayman91',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'How I got into trouble in Providence',
        source: 'blog',
        url: '#',
        author: 'pdfrules',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'What should I do with old iPhone?',
        source: 'nomadforum',
        url: '#',
        author: 'jane005',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'Learn how this guy is doing it',
        source: 'nomadstory',
        url: '#',
        author: 'Jake Ellenburger',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'What up guys',
        source: 'reddit',
        url: '#',
        author: 'drake001',
        date: new Date(2015, 5, 2)
      },
      {
        title: 'Any meetup here?',
        source: 'nomadforum',
        url: '#',
        author: 'thenewguy',
        date: new Date(2015, 5, 2)
      },
      {
        title: 'Should I get a mac?',
        source: 'nomadforum',
        url: '#',
        author: 'jane005',
        date: new Date(2015, 5, 2)
      },
      {
        title: 'US citizen visa required?',
        source: 'reddit',
        url: '#',
        author: 'Jake Ellenburger',
        date: new Date(2015, 5, 2)
      }
    ].forEach(function (feed) {
      Feeds.insert(feed);
    });
  }
});
