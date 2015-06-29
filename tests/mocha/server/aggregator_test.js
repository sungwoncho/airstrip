var expect = chai.expect;

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    beforeEach(function () {
      Flights.remove({});
    });

    describe("ItemFetcher", function(){
      it("creates a flight if there is none for today", function(){
        stubs.create('httpGet', HTTP, 'get');
        stubs.httpGet.returns({ content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:atom=\"http://www.w3.org/2005/Atom\"><channel><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link><description>Digital Nomads are individuals that leverage technology in order to work remotely and live an independent and nomadic lifestyle.</description><image><url>https://www.reddit.com/IIXAHeJVaOkBt3kk.png</url><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link></image><atom:link rel=\"self\" href=\"https://www.reddit.com/r/digitalnomad/hot.rss?limit=1\" type=\"application/rss+xml\" /><item><title>Good carpool sites in the US?</title><link>https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/</link><guid isPermaLink=\"true\">https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/</guid><pubDate>Sun, 28 Jun 2015 21:10:09 +0000</pubDate><description>&lt;!-- SC_OFF --&gt;&lt;div class=&#34;md&#34;&gt;&lt;p&gt;I&amp;#39;m a designer traveling around the US while working nomadically. I&amp;#39;m driving alone, and would love to have some company, as well as help with gas on some of the longer drives. Has anyone used any good carpooling services (like blablacar.com, perhaps) that operate in the US?&lt;/p&gt; &lt;/div&gt;&lt;!-- SC_ON --&gt; submitted by &lt;a href=&#34;http://www.reddit.com/user/yourpalal91&#34;&gt; yourpalal91 &lt;/a&gt; &lt;br/&gt; &lt;a href=&#34;http://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/&#34;&gt;[link]&lt;/a&gt; &lt;a href=\"https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/\"&gt;[comment]&lt;/a&gt;</description></item></channel></rss>" });

        stubs.create('postTweet', PostTweetForFlight, 'post');

        ItemFetcher.fetch();

        expect(Flights.find().count()).to.equal(1);
      });

      it("adds an item with correct values", function(){
        stubs.create('httpGet', HTTP, 'get');
        stubs.httpGet.returns({ content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:atom=\"http://www.w3.org/2005/Atom\"><channel><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link><description>Digital Nomads are individuals that leverage technology in order to work remotely and live an independent and nomadic lifestyle.</description><image><url>https://www.reddit.com/IIXAHeJVaOkBt3kk.png</url><title>Digital Nomad</title><link>https://www.reddit.com/r/digitalnomad/</link></image><atom:link rel=\"self\" href=\"https://www.reddit.com/r/digitalnomad/hot.rss?limit=1\" type=\"application/rss+xml\" /><item><title>Good carpool sites in the US?</title><link>https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/</link><guid isPermaLink=\"true\">https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/</guid><pubDate>Sun, 28 Jun 2015 21:10:09 +0000</pubDate><description>&lt;!-- SC_OFF --&gt;&lt;div class=&#34;md&#34;&gt;&lt;p&gt;I&amp;#39;m a designer traveling around the US while working nomadically. I&amp;#39;m driving alone, and would love to have some company, as well as help with gas on some of the longer drives. Has anyone used any good carpooling services (like blablacar.com, perhaps) that operate in the US?&lt;/p&gt; &lt;/div&gt;&lt;!-- SC_ON --&gt; submitted by &lt;a href=&#34;http://www.reddit.com/user/yourpalal91&#34;&gt; yourpalal91 &lt;/a&gt; &lt;br/&gt; &lt;a href=&#34;http://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/&#34;&gt;[link]&lt;/a&gt; &lt;a href=\"https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/\"&gt;[comment]&lt;/a&gt;</description></item></channel></rss>" });

        stubs.create('postTweet', PostTweetForFlight, 'post');

        ItemFetcher.fetch();

        var item = Flights.findOne({}).items[0];
        expect(item.title).to.equal('Good carpool sites in the US?');
        expect(item.url).to.equal('https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/');
        expect(item.guid).to.equal('https://www.reddit.com/r/digitalnomad/comments/3bftij/good_carpool_sites_in_the_us/');
      });
    });
  });
}
