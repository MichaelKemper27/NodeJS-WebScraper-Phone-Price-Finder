const rp = require('request-promise');
const $ = require('cheerio');
//const url = 'https://swappa.com/mobile/buy/samsung-galaxy-s8-plus/verizon';
const phonePriceParse = function(url) {
    const items = [];
    rp(url)
    .then(function(html){
        //success!
        items.push({
            condition: $('.condition_label', html).text(),
            price: $('.price', html).text(),
        });
        console.log(items);
    })
    .catch(function(err){
        //handle error
    });
    return items;
};

module.exports = phonePriceParse;
