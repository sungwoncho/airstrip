Meteor.startup(function () {
  if (process.env.NODE_ENV !== 'production') {

    if (Flights.find().count() === 0) {

      for (var i = 0; i < 50; i++) {
        var flight = {
          date: moment('2015-05-01').add(i, 'days').format('YYYYMMDD'),
          items: [
            {
              title: Fake.sentence(5),
              source: 'www.reddit.com',
              url: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel/',
              author: 'yayman91'
            },
            {
              title: Fake.sentence(5),
              source: 'some.blog.com',
              url: 'https://some.blog.com/post/123',
              author: 'pdfrules'
            },
            {
              title: Fake.sentence(5),
              source: 'www.nomadforum.io',
              url: 'https://nomadforum.io/t/digital-nomad-101-how-to-become-a-digital-nomad/465',
              author: 'jane005'
            },
            {
              title: Fake.sentence(5),
              source: 'www.nomadlist.com',
              url: 'https://nomadlist.com/stories/iwantmyname-works-remotely?utm_content=buffer6e883&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer',
              author: 'Jake Ellenburger'
            }
          ]
        };

        Meteor.call('addFlight', flight);
      }
    }

  }
});
