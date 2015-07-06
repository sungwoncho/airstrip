newsletterScheduler = {
  run: function (campaign) {
    var mailChimpCampaign = _createCampaign(campaign);

    var scheduleOptions = {
      cid: mailChimpCampaign.id,
      schedule_time: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
    };

    var schedule = this._mailchimpAPI.call('campaigns', 'schedule', scheduleOptions);

    console.log('result: ' + schedule);
  },

  _createCampaign: function () {
    var campaignOptions = {
      type: 'regular',
      options: {
        list_id: Meteor.settings.mailchimpListId,
        subject: campaign.subject,
        from_email: 'hello@airstrip.io',
        from_name: 'airstrip.io'
      },
      content: {
        html: campaign.html,
        text: campaign.text
      }
    };

    this.mailchimpAPI.call('campaigns', 'create', newsletterOptions);
  },

  _mailchimpAPI: function () {
    return new MailChimp(Meteor.settings.mailchimpAPIKey);
  }
};
