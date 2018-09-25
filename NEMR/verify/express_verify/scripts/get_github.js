require('date-utils');

const puppeteer = require('puppeteer');

var dt = new Date();
var dt_formatted = dt.toFormat("YYYYMMDDHH");
var dt_dict = {'get_datetime': dt_formatted};

items_list = {'execute_datetime': dt_formatted};

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://github.com/trending');

    var item = await page.$('.repo-list');
    var data = await (await item.getProperty('innerHTML')).jsonValue()
    var data_parse = data.match(/\<h3>[\s\S]*?<\/h3>/g);




    for (r in data_parse) {
      var parse_item = {};
      parse_item["url"]   = "https://github.com/" + data_parse[r].match(/href=\"(.*?)\"/)[1];
      parse_item["title"] = data_parse[r].match(/<span .*?>(.*?)<\/span>/)[1] + data_parse[r].match(/<\/span>(.*?)\n?<\/a>/)[1];
      items_list.push(parse_item);
    };
    console.log(items_list);
    browser.close();
});
