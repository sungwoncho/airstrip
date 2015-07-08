Router.route('/i/:shortLink', {
  name: 'shortLink',
  where: 'server',
  action: function () {
    var item = Items.findOne({shortLink: this.params.shortLink});
    var clientIP = this.request.headers['x-forwarded-for'];

    Meteor.call('incrementViewCount', item._id, clientIP);

    this.response.writeHead(302, {'Location': item.url});
    this.response.end();
  }
});
