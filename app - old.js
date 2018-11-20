const http = require('http');

const hostname = "127.0.0.1";
const port = 3000;

const rp = require('request-promise');
const $ = require('cheerio');
const phonePriceParse = require('./phonePriceParse');
const url = 'https://swappa.com/mobile/buy/samsung-galaxy-s8-plus/verizon';

const server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-type', "text/plain");

    // rp(url)
    // .then(function(html) {
    //     //success!
    //     const phones = [];
    //     for (let i = 0; i < $('.listing_row.listing_None.listing_None', html).length; i++) {
    //         phones.push($('.listing_row.listing_None.listing_None', html)[i]);
    //         console.log($('.listing_row.listing_None.listing_None', html)[i]);
    //     }
    //     console.log(phones);
    //     return Promise.all(
    //         phones.map(function(url) {
    //             return phonePriceParse(url);
    //         })
    //     );
    // })
    // .then(function(phone) {
    //     console.log(phone);
    // })
    // .catch(function(err) {
    //     //handle error
    //     console.log(err);
    // });
    var phonesList = [];
    rp(url)
        .then(function(html){
            $('.listing_row.listing_None.listing_None').each(function(index, element){
                phonesList[index] = {};
            	var header = $(element).find('.listing_row.listing_None.listing_None');
            	phonesList[index]['condition'] = $('.condition_label', html).text();
            	phonesList[index]['price'] = $('.price', html).text();
                console.log("Yup");
            })
        .catch(function(err){
            //handle error
        })
    });
    console.log(phonesList); // Output the data in the terminal

  // const items = phonePriceParse(url);
  // items.map = phonePriceParse(url);
  // console.log(items);
    res.end("Hello World!");
});

// rp(url)
// .then(function(html){
//     //success!
//     console.log($('.price', html).text);
//     //console.log($('big > a', html));
// })
// .catch(function(err){
//     //handle error
// });

server.listen(port, hostname, function() {
    console.log("Server started on port " + port);
});
