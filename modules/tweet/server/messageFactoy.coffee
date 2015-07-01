@MessageFactory =
  buildForItem: (item) ->
   "Check out: \"#{item.title}\" on ✈#{item.flightNumber} #{item.url}"

  buildForFlight: (flight) ->
    "✈✈✈ Flight # #{flight.number} on @airstripio - http://airstrip.io/f/ #{flight.date} #digitalnomad";
