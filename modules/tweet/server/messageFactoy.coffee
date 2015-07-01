@MessageFactory =
  buildForItem: (item) ->
    flightNumber = Flights.findOne(item.flightId).number
    "Check out: \"#{item.title}\" on ✈#{flightNumber} #{item.url}"

  buildForFlight: (flight) ->
    "✈✈✈ Flight # #{flight.number} on @airstripio - http://airstrip.io/f/#{flight.date} #digitalnomad"
