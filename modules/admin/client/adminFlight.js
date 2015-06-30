Template.adminFlight.helpers({
  getVisibility: function () {
    return this.hidden ? 'hidden' : 'visible';
  }
});

Template.adminFlight.events({
  'click .toggle-visibility': function (e) {
    e.preventDefault();
    Meteor.call('toggleItemVisibility', this.guid);
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
      hidden: false
    };

    Meteor.call('addItem', this.number, item, function (error, response) {
      if (error)
        console.log(error);
    });

  }
});
