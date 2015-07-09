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
      "Check this out:",
      "Here you go:",
      "New:",
      "Dear paseengers:"
    ];

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
    return Utils.buildShortUrl(item);
  }

  _getDescription() {
    return _.sample([
      "is new.",
      "is a good read.",
      "Read it at:",
      "Here is the link!"
    ]);
  }
};
