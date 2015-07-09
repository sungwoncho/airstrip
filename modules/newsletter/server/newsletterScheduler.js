newsletterScheduler = {
  schedule: function (campaign) {
    var mailchimpCampaign = this.createCampaign(campaign);
    var scheduledTime = moment().utc().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');

    var scheduleOptions = {
      cid: mailchimpCampaign.id,
      schedule_time: scheduledTime
    };

    console.log('Scheduling campaign...');
    var schedule = this.mailchimpAPI().call('campaigns', 'schedule', scheduleOptions, function (err, res) {
      if (err) {
        console.log('Error while scheduling campaign : ' + err);
      } else {
        console.log('Successfully scheduled the campaign at ' + scheduledTime);
      }
    });
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

    console.log('Creating campaign...');
    var newCampaign = Async.runSync(function (done) {
      newsletterScheduler.mailchimpAPI().call('campaigns', 'create', campaignOptions, function (err, res) {
        done(err, res);
      });
    });

    if (newCampaign.error) {
      throw new Error('Could not create the campaign: ' + newCampaign.error);
    } else {
      console.log('Created the campaign');
      return newCampaign.result;
    }
  },

  mailchimpAPI: function () {
    return new MailChimp(Meteor.settings.mailchimpAPIKey);
  }
};

Meteor.methods({
  scheduleDailyDigest: function () {
    var latestFlight = Flights.findOne({}, {sort: {date: -1}, limit: 1});

    var campaign = campaignFactory.buildDaily(latestFlight);
    newsletterScheduler.schedule(campaign);
  },

  scheduleWeeklyDigest: function () {
    var campaign = campaignFactory.buildWeekly();
    newsletterScheduler.schedule(campaign);
  }
});
