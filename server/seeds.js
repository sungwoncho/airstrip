Meteor.startup(function () {
  if (Feeds.find().count() == 0) {
    [
      {
        title: 'Just arrived here in Chicago',
        source: 'reddit',
        url: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel/',
        author: 'yayman91',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'How I got into trouble in Providence',
        source: 'blog',
        url: 'https://some.blog.com',
        author: 'pdfrules',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'What should I do with old iPhone?',
        source: 'nomadforum',
        url: 'https://nomadforum.io/t/digital-nomad-101-how-to-become-a-digital-nomad/465',
        author: 'jane005',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'Learn how this guy is doing it',
        source: 'nomadstory',
        url: 'https://nomadlist.com/stories/iwantmyname-works-remotely?utm_content=buffer6e883&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer',
        author: 'Jake Ellenburger',
        date: new Date(2015, 5, 1)
      },
      {
        title: 'What up guys',
        source: 'reddit',
        url: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel',
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
        url: 'https://nomadforum.io/t/digital',
        author: 'jane005',
        date: new Date(2015, 5, 2)
      },
      {
        title: 'US citizen visa required?',
        source: 'reddit',
        url: 'http://www.nytimes.com/2015/06/14/fashion/a-curious-midlife-crisis-for-a-tech-entrepreneur.html?emc=eta1',
        author: 'Jake Ellenburger',
        date: new Date(2015, 5, 2)
      }
    ].forEach(function (feed) {
      Feeds.insert(feed);
    });
  }
});
