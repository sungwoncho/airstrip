Router.route('/', {
  name: 'home',
  template: 'flight',
  data: function () {
    return Flights.findOne({}, {sort: {date: -1}});
  },
  waitOn: function () {
    return Meteor.subscribe('recent-flights', {limit: 4});
  }
});

Router.route('/f/:date', {
  name: 'flight.show',
  template: 'flight',
  data: function () {
    return Flights.findOne({date: this.params.date});
  },
  waitOn: function () {
    return [
      Meteor.subscribe('recent-flights', {limit: 4}),
      Meteor.subscribe('flight', this.params.date)
    ];
  },
  onAfterAction: function () {
    if (this.ready()) {
      var flight = this.data();
      var date = Utils.dateStringToDate(flight.date);
      var displayDate = moment(date).add(1,'month').format('MMM DD YYYY');
      var sourceCount = Utils.getSourceList(flight).length;

      SEO.set({
        title: `airstrip.io - Nomad flight #${flight.number} on ${displayDate}`,
        meta: {
          'description': `This flight features ${flight.itemIds.length} digital nomad stories from ${sourceCount} sources.`
        }
      });
    }
  }
});

Router.route('/f', {
  name: 'flight.index',
  template: 'flights',
  waitOn: function () {
    return Meteor.subscribe('all-flights');
  }
});
