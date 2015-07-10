sitemaps.add('/sitemap.xml', function () {
  var paths = [{page: '/', changefeq: 'daily'}],
      flights = Flights.find().fetch();

  // Define path for each flights
  _.each(flights, function (flight) {
    paths.push({
      page: `f/${flight.date}`,
      lastmod: flight.createdAt
    });
  });

  return paths;
});
