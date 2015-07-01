Template.adminFlight.helpers({
  getVisibility: function () {
    return this.hidden ? 'hidden' : 'visible';
  },

  items: function () {
    return Items.find({flightId: this._id});
  }
});

Template.adminFlight.events({
  'click .toggle-visibility': function (e) {
    e.preventDefault();
    Meteor.call('toggleHidden', this._id);
  },

  'submit form.add-item': function (e, tpl) {
    e.preventDefault();
    var title = tpl.$('input.title').val();
    var source = tpl.$('input.source').val();
    var url = tpl.$('input.url').val();

    var item = {
      title: title,
      url: url,
      guid: url,
      source: source,
      createdAt: new Date()
    };

    Meteor.call('createItem', item, moment().format('YYYYMMDD'), function (error, response) {
      if (error)
        console.log(error);
    });

  }
});
