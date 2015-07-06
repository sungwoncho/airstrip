newsletterScheduler = {
  schedule: function (campaign) {
    var mailchimpCampaign = this.createCampaign(campaign);

    var scheduleOptions = {
      cid: mailchimpCampaign.id,
      schedule_time: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
    };

    var schedule = this._mailchimpAPI.call('campaigns', 'schedule', scheduleOptions);
    // console.log('result: ' + schedule);
  },

  createCampaign: function (campaign) {
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

    var newCampaign = this._mailchimpAPI.call('campaigns', 'create', campaignOptions);

    return newCampaign;
  },

  _mailchimpAPI: function () {
    return new MailChimp(Meteor.settings.mailchimpAPIKey);
  }
};
