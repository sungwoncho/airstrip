var expect = chai.expect;

MochaWeb.testOnly(function(){
  beforeEach(function () {
    Flights.remove({});
    Items.remove({});
    Feeds.remove({});
  });

  afterEach(function () {
    stubs.restoreAll();
  });

  describe("ItemFetcher", function(){
    it("creates a flight and an item with correct values", function(){
      var feed = Factory.create('feed');

      // Stub HTTP reqeust to return XML response with one article
      stubs.create('httpGet', HTTP, 'get');
      stubs.httpGet.withArgs(feed.url).returns({ content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:atom=\"http://www.w3.org/2005/Atom\"><channel><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link><description>Digital Nomads are individuals that leverage technology in order to work remotely and live an independent and nomadic lifestyle.</description><image><url>https://www.reddit.com/IIXAHeJVaOkBt3kk.png</url><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link></image><atom:link rel=\"self\" href=\"https://www.reddit.com/r/digitalnomad/hot.rss?limit=1\" type=\"application/rss+xml\" /><item><title>Good carpool sites in the US?</title><link>https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/</link><guid isPermaLink=\"true\">https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/</guid><pubDate>Sun, 28 Jun 2015 21:10:09 +0000</pubDate><description>&lt;!-- SC_OFF --&gt;&lt;div class=&#34;md&#34;&gt;&lt;p&gt;I&amp;#39;m a designer traveling around the US while working nomadically. I&amp;#39;m driving alone, and would love to have some company, as well as help with gas on some of the longer drives. Has anyone used any good carpooling services (like blablacar.com, perhaps) that operate in the US?&lt;/p&gt; &lt;/div&gt;&lt;!-- SC_ON --&gt; submitted by &lt;a href=&#34;http://www.reddit.com/user/yourpalal91&#34;&gt; yourpalal91 &lt;/a&gt; &lt;br/&gt; &lt;a href=&#34;http://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/&#34;&gt;[link]&lt;/a&gt; &lt;a href=\"https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/\"&gt;[comment]&lt;/a&gt;</description></item></channel></rss>" });

      stubs.create('postTweet', Tweet, 'postForFlight');

      ItemFetcher.fetch();

      // Multiple assertion to prevent race condition for Items.find().count()
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Items.find().count()).to.equal(1);

      var item = Items.findOne();
      expect(item.title).to.equal('Good carpool sites in the US?');
      expect(item.url).to.equal('https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/');
      expect(item.guid).to.equal('https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/');
      expect(item.sourceName).to.equal('Example');
      expect(item.sourceUrl).to.equal('http://www.example.com');
      expect(item.sourceType).to.equal('blog');
    });

    it("does not create more than the daily limit from feed", function(){
      var feed = Factory.create('feed', {dailyItemLimit: 1});

      // Return two articles
      stubs.create('httpGet', HTTP, 'get');
      stubs.httpGet.withArgs(feed.url).returns({ content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:atom=\"http://www.w3.org/2005/Atom\"><channel><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link><description>Digital Nomads are individuals that leverage technology in order to work remotely and live an independent and nomadic lifestyle.</description><image><url>https://www.reddit.com/IIXAHeJVaOkBt3kk.png</url><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link></image><atom:link rel=\"self\" href=\"https://www.reddit.com/r/digitalnomad/hot.rss?limit=2\" type=\"application/rss+xml\" /><item><title>I just put together a list of the most requested skills/technologies for remote jobs on careers.stackoverflow.com.</title><link>https://www.reddit.com/r/digitalnomad/comments/3bxofy/i_just_put_together_a_list_of_the_most_requested/</link><guid isPermaLink=\"true\">https://www.reddit.com/r/digitalnomad/comments/3bxofy/i_just_put_together_a_list_of_the_most_requested/</guid><pubDate>Fri, 03 Jul 2015 00:32:10 +0000</pubDate><description>&lt;!-- SC_OFF --&gt;&lt;div class=&#34;md&#34;&gt;&lt;p&gt;The extraction algorithm needs a little more tweaking but the results are interesting none the less. This is based on 309 job descriptions I pulled a few hours ago.&lt;/p&gt; &lt;ul&gt; &lt;li&gt;JavaScript 169&lt;/li&gt; &lt;li&gt;source control 126&lt;/li&gt; &lt;li&gt;html 119&lt;/li&gt; &lt;li&gt;CSS 109&lt;/li&gt; &lt;li&gt;Ruby 70&lt;/li&gt; &lt;li&gt;Python 56&lt;/li&gt; &lt;li&gt;PHP 55&lt;/li&gt; &lt;li&gt;Linux 52&lt;/li&gt; &lt;li&gt;GIT 50&lt;/li&gt; &lt;li&gt;Node.js 47&lt;/li&gt; &lt;li&gt;SQL 43&lt;/li&gt; &lt;li&gt;Github 40&lt;/li&gt; &lt;li&gt;AWS 38&lt;/li&gt; &lt;li&gt;Java 36&lt;/li&gt; &lt;li&gt;API 33&lt;/li&gt; &lt;li&gt;Ruby On Rails 30&lt;/li&gt; &lt;li&gt;Android 26&lt;/li&gt; &lt;/ul&gt; &lt;p&gt;Just for giggles here&amp;#39;s a list of job titles:&lt;/p&gt; &lt;ul&gt; &lt;li&gt;Rails developer 19&lt;/li&gt; &lt;li&gt;Web Developer 19&lt;/li&gt; &lt;li&gt;Software Engineer 18&lt;/li&gt; &lt;li&gt;Senior Software Engineer 17&lt;/li&gt; &lt;li&gt;Software Developer 13&lt;/li&gt; &lt;li&gt;developers 11&lt;/li&gt; &lt;li&gt;DevOps Engineer 11&lt;/li&gt; &lt;li&gt;iOS Developer 8&lt;/li&gt; &lt;li&gt;project manager 8&lt;/li&gt; &lt;li&gt;Javascript Developer 7&lt;/li&gt; &lt;li&gt;designers 7&lt;/li&gt; &lt;li&gt;software developers 6&lt;/li&gt; &lt;li&gt;Front-End Developer 6&lt;/li&gt; &lt;li&gt;Product Manager 6&lt;/li&gt; &lt;li&gt;senior developer 5&lt;/li&gt; &lt;li&gt;LEAD developer 5&lt;/li&gt; &lt;li&gt;PHP Developer 5&lt;/li&gt; &lt;/ul&gt; &lt;p&gt;This was just an experiment but it seems like it could be useful information for someone looking to gain marketable skills in order to find a remote position. I&amp;#39;m happy to gather some more data if there is enough interest.&lt;/p&gt; &lt;/div&gt;&lt;!-- SC_ON --&gt; submitted by &lt;a href=&#34;http://www.reddit.com/user/csharpdev01&#34;&gt; csharpdev01 &lt;/a&gt; &lt;br/&gt; &lt;a href=&#34;http://www.reddit.com/r/digitalnomad/comments/3bxofy/i_just_put_together_a_list_of_the_most_requested/&#34;&gt;[link]&lt;/a&gt; &lt;a href=\"https://www.reddit.com/r/digitalnomad/comments/3bxofy/i_just_put_together_a_list_of_the_most_requested/\"&gt;[5 comments]&lt;/a&gt;</description></item><item><title>any great Work Retreat or Workation program in North America you can suggest?</title><link>https://www.reddit.com/r/digitalnomad/comments/3bwyzj/any_great_work_retreat_or_workation_program_in/</link><guid isPermaLink=\"true\">https://www.reddit.com/r/digitalnomad/comments/3bwyzj/any_great_work_retreat_or_workation_program_in/</guid><pubDate>Thu, 02 Jul 2015 20:59:24 +0000</pubDate><description>submitted by &lt;a href=&#34;http://www.reddit.com/user/wanderlustlab&#34;&gt; wanderlustlab &lt;/a&gt; &lt;br/&gt; &lt;a href=&#34;http://www.reddit.com/r/digitalnomad/comments/3bwyzj/any_great_work_retreat_or_workation_program_in/&#34;&gt;[link]&lt;/a&gt; &lt;a href=\"https://www.reddit.com/r/digitalnomad/comments/3bwyzj/any_great_work_retreat_or_workation_program_in/\"&gt;[comment]&lt;/a&gt;</description></item></channel></rss>" });

      stubs.create('postTweet', Tweet, 'postForFlight');

      ItemFetcher.fetch();

      // Multiple assertion to prevent race condition for Items.find().count()
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Flights.find().count()).to.equal(1);
      expect(Items.find().count()).to.equal(1);
    });
  });
});
