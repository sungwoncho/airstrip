FlightTweetFactory = class FlightTweetFactory {
  constructor(flight) {
    this.flight = flight;
  }

  get build() {
    return `[Notice] Flight #${this.flight.number} has landed on time - http://airstrip.io/f/${this.flight.date}`;
  }
};
