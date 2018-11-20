const http = require('http');
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

    url = 'https://swappa.com/mobile/buy/samsung-galaxy-s8-plus/verizon';
    request(url, function(error, response, html){
        if(!error){
            var allPhones = [];
            var $ = cheerio.load(html);

            var seller, condition, price;
            var json = { seller : "", condition : "", price : ""};

            // We'll use the unique header class as a starting point.

            $('.listing_row.listing_None.listing_None').filter(function(){
                json = { seller : "", condition : "", price : ""};
           // Let's store the data we filter into a variable so we can easily see what's going on.
                var data = $(this);

           // In examining the DOM we notice that the title rests within the first child element of the header tag.
           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                seller = condition = $(this).find('.text-nowrap').children().first().text();
                console.log(seller);
                condition = $(this).find('.condition_label').text();//data.children().first().text();
                console.log(condition);
                price = $(this).find('.price').first().text();
                console.log(price);
           // Once we have our title, we'll store it to the our json object.

                json.seller = seller;
                json.condition = condition;
                json.price = price;
                console.log(json);
                allPhones.push(json);
                console.log(allPhones);
                console.log("\n");
            })
            console.log(allPhones);
            res.send(allPhones);
        }
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
