Meteor.startup(function () {
  if (Flights.find().count() === 0) {
    [
      {
        date: moment('2015-05-01').format('MMMM D, YYYY'),
        items: [
          {
            title: 'Just arrived here in Chicago',
            source: 'www.reddit.com',
            url: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel/',
            author: 'yayman91'
          },
          {
            title: 'How I got into trouble in Providence',
            source: 'some.blog.com',
            url: 'https://some.blog.com/post/123',
            author: 'pdfrules'
          },
          {
            title: 'What should I do with old iPhone?',
            source: 'www.nomadforum.io',
            url: 'https://nomadforum.io/t/digital-nomad-101-how-to-become-a-digital-nomad/465',
            author: 'jane005'
          },
          {
            title: 'Learn how this guy is doing it',
            source: 'www.nomadlist.com',
            url: 'https://nomadlist.com/stories/iwantmyname-works-remotely?utm_content=buffer6e883&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer',
            author: 'Jake Ellenburger'
          }
        ]
      },
      {
        date: moment('2015-05-02').format('MMMM D, YYYY'),
        items: [
          {
            title: 'What up guys',
            source: 'www.reddit.com',
            url: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel',
            author: 'drake001'
          },
          {
            title: 'Any meetup here?',
            source: 'www.nomadforum.io',
            url: '#',
            author: 'thenewguy'
          },
          {
            title: 'Should I get a mac?',
            source: 'www.nomadforum.io',
            url: 'https://nomadforum.io/t/digital',
            author: 'jane005'
          },
          {
            title: 'US citizen visa required?',
            source: 'www.reddit.com',
            url: 'http://www.nytimes.com/2015/06/14/fashion/a-curious-midlife-crisis-for-a-tech-entrepreneur.html?emc=eta1',
            author: 'Jake Ellenburger'
          }
        ]
      }
    ].forEach(function (feed) {
      Flights.insert(feed);
    });
  }
});
