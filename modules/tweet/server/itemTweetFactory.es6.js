itemTweetFactory = {
  build: function (item) {
    var trim = 0,
        status = getStatus(item, trim);

    while (status.length > 140) {
      trim++;
      status = getStatus(item, trim);
    }

    return status;
  }
};

getStatus = function (item, trim = 0) {
  return _.sample([
    `${getOpening(item)} ${getTitle(item, trim)} ${getFlightNumber(item)} ${getUrl(item)}`,
    `${getTitle(item, trim)} ${getDescription(item)} ${getUrl(item)}`
  ]);
};


getTitle = function (item, trim = 0) {
  var title = item.title;
  var trimmedTitle = title.slice(0, title.length - trim);

  return `"${trimmedTitle}"`;
};

getOpening = function (item) {
  var possibleOpening = [
    "Check out:",
    "Have you read this?",
    "Recent item:",
    "New:",
    "Dear paseengers:"
  ];

  if (item.sourceName === 'Reddit') {
    possibleOpening.push(
      "Recently on Reddit:",
      "New on Reddit:",
      "Reddit:",
      "New item on /r/digitalnomad",
      "On Reddit:"
    );
  }

  if (item.sourceName === 'NomadForum') {
    possibleOpening.push(
      "Recently on nomadforum:",
      "Check out this thread on nomadforum.",
      "On nomadforum:",
      "New post on nomadforum",
      "New on nomadforum"
    );
  }

  if (item.sourceType === 'blog') {
    possibleOpening.push(
      "New blog post:",
      "Meanwhile in a nomad blog:",
      "Blog post:",
      "Check out this post:"
    );
  }

  return _.sample(possibleOpening);
};

getFlightNumber = function (item) {
  var flightNumber = Flights.findOne(item.flightId).number;

  return _.sample([
    `on flight #${flightNumber}`,
    `is on flight #${flightNumber}`,
    `✈✈${flightNumber}`
  ]);
};

getUrl = function (item) {
  return Utils.buildShortUrl(item);
};

getDescription = function (item) {
  var possibleDescriptions = [
    "is new.",
    "Read it at:"
  ];

  if (item.sourceName === 'Reddit') {
    possibleDescriptions.push(
      "is on Reddit.",
      "is new on Reddit",
      "was posted on Reddit"
    );
  }

  if (item.sourceName === 'NomadForum') {
    possibleDescriptions.push(
      "is on nomadforum.",
      "was posted on nomadforum.",
      "on nomadforum:",
      "Read at nomadforum:"
    );
  }

  if (item.sourceType === 'blog') {
    possibleDescriptions.push(
      "is a new blog post.",
      "New blog post.",
      "Maybe worth reading?",
      "Check out the blog post:",
      "Blog post:"
    );
  }

  return _.sample(possibleDescriptions);
};
