/*
var client = require('cheerio-httpcli');

// Googleで「node.js」について検索する。
client.fetch('https://qiita.com/', {}, function (err, $, res) {

  //get_html = $('.tr-ItemList').html()
  //var parse_html = get_html.match(/^.*data-hyperapp-props=\"(.*)\">.*$/);
  //console.log(get_html);
  //var json_parse_html = JSON.parse(parse_html[1])
  //console.log(json_parse_html["trend"]["edges"][0]);

  get_html = $('body').html();
  console.log(get_html);
});
*/
const puppeteer = require('puppeteer');

/*
puppeteer.launch().then(async browser => {
const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.goto('https://qiita.com/');


var data = await page.evaluate((selector) => {
  return document.querySelector(selector).textContent;
}, itemSelector);

console.log(data);
*/
//let itemSelector="body > div.allWrapper > div.p-home.px-2.px-1\40 s.pt-4.pt-1\40 s > div > div.p-home_main.mb-3.mr-0\40 s > div > div:nth-child(2) > div > div:nth-child(2) > div > a";

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://qiita.com/');
    /*
    var data = await page.$eval('.tr-Item', item => {
      return item.textContent;
    });
    */
    var item = await page.$('.tr-ItemList');
    var data = await (await item.getProperty('innerHTML')).jsonValue()
    var data_parse = data.match(/<a class="tr-Item_title" href=\".*?\">.*?<\/a>/g);
    //var data_parse = data.match(/div/g);
    /*
    var item = await page.$('.tr-ItemList');
    var data = {
      textContent: await (await item.getProperty('textContent')).jsonValue(),
      innerHTML: await (await item.getProperty('innerHTML')).jsonValue()
    };
    /*
    const hoges = await page.evaluate(() => {
        const node = document.querySelector().innerText;
        return node;
    });
    */
    items_list = [];
    for (r in data_parse) {
      var parse_item = {};
      parse_item["url"]   = "https://qiita.com/" + data_parse[r].match(/href=\"(.*?)\"/)[1];
      parse_item["title"] = data_parse[r].match(/href=\".*?\">(.*?)<\/a>/)[1];
      items_list.push(parse_item);
    };
    console.log(items_list);
    browser.close();
});
