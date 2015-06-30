// Meteor.startup(function () {
//   if (process.env.NODE_ENV !== 'production') {
//
//     if (Flights.find().count() === 0) {
//
//       for (var i = 0; i < 50; i++) {
//         var flight = {
//           date: moment('2015-05-01').add(i, 'days').format('YYYYMMDD'),
//           items: [
//             {
//               title: Fake.sentence(5),
//               source: 'www.reddit.com',
//               url: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel/',
//               guid: 'http://www.reddit.com/r/digitalnomad/comments/39ytta/asking_employer_to_allow_work_remotely_for_travel/' + i,
//               author: 'yayman91',
//               hidden: false
//             },
//             {
//               title: Fake.sentence(5),
//               source: 'some.blog.com',
//               url: 'https://some.blog.com/post/123',
//               guid: 'https://some.blog.com/post/123' + i,
//               author: 'pdfrules',
//               hidden: false
//             },
//             {
//               title: Fake.sentence(5),
//               source: 'www.nomadforum.io',
//               url: 'https://nomadforum.io/t/digital-nomad-101-how-to-become-a-digital-nomad/465',
//               guid: 'https://nomadforum.io/t/digital-nomad-101-how-to-become-a-digital-nomad/465' + i,
//               author: 'jane005',
//               hidden: false
//             },
//             {
//               title: Fake.sentence(5),
//               source: 'www.nomadlist.com',
//               url: 'https://nomadlist.com/stories/iwantmyname-works-remotely?utm_content=buffer6e883&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer',
//               guid: 'https://nomadlist.com/stories/iwantmyname-works-remotely?utm_content=buffer6e883&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer' + i,
//               author: 'Jake Ellenburger',
//               hidden: false
//             }
//           ]
//         };
//
//         Meteor.call('addFlight', flight);
//       }
//     }
//
//   }
// });
