Router.route('/i/:shortLink', {
  name: 'shortLink',
  where: 'server',
  action: function () {
    var item = Items.findOne({shortLink: this.params.shortLink});

    this.response.writeHead(302, {'Location': item.url});
    this.response.end();
  }
});
