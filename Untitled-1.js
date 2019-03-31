// var Crawler = require("js-crawler");
 
// new Crawler().configure({depth: 3})
//   .crawl("http://localhost:8100", function onSuccess(page) {
//     console.log(page.url);
//   });
  

// Options-based API
// Alternative APIs for passing callbacks to the crawl function.
// var Crawler = require("js-crawler");
 
// var crawler = new Crawler().configure({ignoreRelative: false, depth: 2});
 
// crawler.crawl({
//   url: "http://localhost:8100",
//   success: function(page) {
//     console.log(page.url);
//   },
//   failure: function(page) {
//     console.log(page.status);
//   },
//   finished: function(crawledUrls) {
//     console.log(crawledUrls);
//   }
// });




//Handling errors
var Crawler = require("js-crawler");
 
new Crawler().configure({depth: 3})
  .crawl("http://localhost:8100", function(page) {
    console.log(page.url);
  }, function(response) {
    console.log("ERROR occurred:");
    console.log(response.status);
    console.log(response.url);
    console.log(response.referer);
  });




// //Knowing when all crawling is finished
// //Extra callback can be passed that will be called when all the urls have been crawled and crawling has finished. All crawled urls will be passed to that callback as an argument.

// var Crawler = require("js-crawler");
 
// new Crawler().configure({depth: 2})
//   .crawl("http://localhost:8100", function onSuccess(page) {
//     console.log(page.url);
//   }, null, function onAllFinished(crawledUrls) {
//     console.log('All crawling finished');
//     console.log(crawledUrls);
//   });