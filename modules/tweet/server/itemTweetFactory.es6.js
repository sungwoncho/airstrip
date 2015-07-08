ItemTweetFactory = class ItemTweetFactory {
  constructor(item) {
    this.item = item;
    this.opening = _getOpening();
    this.itemTitle = _getTitle(item);
    this.flightNumber = _getFlightNumber(item);
    this.url = _getUrl(item);
    this.description = _getDescription();
  }

  get build() {
    return _.sample([
      `${this.opening} ${this.itemTitle} ${this.flightNumber} ${this.url}`,
      `${this.itemTitle} ${this.description} ${this.url}`
    ]);
  }
};

var _getOpening = function (item) {
  return _.sample([
    "Check out:",
    "Have you read this?",
    "Recent item:",
    "Check this out:",
    "Here you go:",
    "Recommended:"
  ]);
};

var _getFlightNumber = function (item) {
  var flightNumber = Flights.findOne(item.flightId).number;

  return _.sample([
    `on flight #${flightNumber}`,
    `is on flight #${flightNumber}`,
    `✈✈${flightNumber}`
  ]);
};

var _getTitle = function (item) {
  return `"${item.title}"`;
};

var _getUrl = function (item) {
  return Utils.buildShortUrl(item);
};

var _getDescription = function () {
  return _.sample([
    "is trending.",
    "is a good read.",
    "Read it at:",
    "Here is the link!"
  ]);
};
