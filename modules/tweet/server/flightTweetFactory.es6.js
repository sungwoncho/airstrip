FlightTweetFactory = class FlightTweetFactory {
  constructor(flight) {
    this.flight = flight;
  }

  get build() {
    return `✈✈✈ Flight # ${this.flight.number} has landed - http://airstrip.io/f/${this.flight.date} #digitalnomad`;
  }
};
