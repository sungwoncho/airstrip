itemTweetFactory = class itemTweetFactory {
  constructor(item) {
    this.item = item;
  }

  static build(item) {
    var obj = new itemTweetFactory(item); // instantiate an itemTweetFactory object

    var trim = 0,
        status = obj._getStatus(trim);

    while (status.length > 140) {
      trim++;
      status = obj._getStatus(trim);
    }

    return status;
  }

  _getStatus(trim = 0) {
    var obj = new itemTweetFactory(this.item);

    return _.sample([
      `${obj._getOpening()} ${obj._getTitle(trim)} ${obj._getFlightNumber()} ${obj._getUrl()}`,
      `${obj._getTitle(trim)} ${obj._getDescription()} ${obj._getUrl()}`
    ]);
  }

  _getTitle(trim = 0) {
    var title = this.item.title;
    var trimmedTitle = title.slice(0, title.length - trim);

    return `"${trimmedTitle}"`;
  }

  _getOpening() {
    var possibleOpening = [
      "Check out:",
      "Have you read this?",
      "Recent item:",
      "New:",
      "Dear paseengers:"
    ];

    if (this.item.sourceName === 'Reddit') {
      possibleOpening.push(
        "Recently on Reddit:",
        "New on Reddit:",
        "Reddit:",
        "New item on /r/digitalnomad",
        "On Reddit:"
      );
    }

    if (this.item.sourceName === 'NomadForum') {
      possibleOpening.push(
        "Recently on nomadforum:",
        "Check out this thread on nomadforum.",
        "On nomadforum:",
        "New post on nomadforum",
        "New on nomadforum"
      );
    }

    if (this.item.sourceType === 'blog') {
      possibleOpening.push(
        "New blog post:",
        "Meanwhile in a nomad blog:",
        "Blog post:",
        "Check out this post:"
      );
    }

    return _.sample(possibleOpening);
  }

  _getFlightNumber() {
    var flightNumber = Flights.findOne(this.item.flightId).number;

    return _.sample([
      `on flight #${flightNumber}`,
      `is on flight #${flightNumber}`,
      `✈✈${flightNumber}`
    ]);
  }

  _getUrl() {
    return Utils.buildShortUrl(this.item);
  }

  _getDescription() {
    var possibleDescriptions = [
      "is new.",
      "Read it at:"
    ];

    if (this.item.sourceName === 'Reddit') {
      possibleDescriptions.push(
        "is on Reddit.",
        "is new on Reddit",
        "was posted on Reddit"
      );
    }

    if (this.item.sourceName === 'NomadForum') {
      possibleDescriptions.push(
        "is on nomadforum.",
        "was posted on nomadforum.",
        "on nomadforum:",
        "Read at nomadforum:"
      );
    }

    if (this.item.sourceType === 'blog') {
      possibleDescriptions.push(
        "is a new blog post.",
        "New blog post.",
        "Maybe worth reading?",
        "Check out the blog post:"
      );
    }

    return _.sample(possibleDescriptions);
  }
};
