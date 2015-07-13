itemTweetFactory = {
  build: function (item, type = 'regular') {
    var trim = 0,
        status = getStatus(item, type, trim);

    while (status.length > 140) {
      trim++;
      status = getStatus(item, type, trim);
    }

    return status;
  }
};

var getStatus = function (item, type = 'regular', trim = 0) {
  if (type === 'regular') {
    return _.sample([
      `${getOpening(item)} ${getTitle(item, trim)}${getAuthorTwitter(item)} ${getFlightNumber(item)} ${getUrl(item)}`,
      `${getTitle(item, trim)}${getAuthorTwitter(item)} ${getDescription(item)} ${getUrl(item)}`
    ]);
  } else if (type === 'trending') {
    var Indicator = _.sample(["🔥", "🌟", "💫", "🌠"]);
    return `${Indicator} Trending ${Indicator} ${getTitle(item, trim)}${getAuthorTwitter(item)} ${getTrendingDescription(item)} ${getUrl(item)}`;
  }
};

var getAuthorTwitter = function (item) {
  if (!!item.authorTwitter) {
    return ` by @${item.authorTwitter}`;
  } else {
    return '';
  }
};

var getTitle = function (item, trim = 0) {
  var title = item.title;
  var trimmedTitle = title.slice(0, title.length - trim);

  return `"${trimmedTitle}"`;
};

var getOpening = function (item) {
  var possibleOpening = [
    "Check out:",
    "Recent:",
    "New:",
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

var getFlightNumber = function (item) {
  var flightNumber = Flights.findOne(item.flightId).number;

  return _.sample([
    `on flight #${flightNumber}`,
    `is on flight #${flightNumber}`,
    `✈✈${flightNumber}`
  ]);
};

var getUrl = function (item) {
  return Utils.buildShortUrl(item);
};

var getDescription = function (item) {
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

var getTrendingDescription = function (item) {
  var possibleDescriptions = [
    "Most viewed (last 24 hrs)."
  ];

  return _.sample(possibleDescriptions);
};
