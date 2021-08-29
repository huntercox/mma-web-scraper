// Scrape Sherdog for Fighter info

const puppeteer = require('puppeteer');

(async () => {
  // Create an instance of the chrome browser
  // But disable headless mode !
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized']
  });

  // Create a new page
  const page = await browser.newPage();

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

  await page.goto('https://www.sherdog.com/fighter/TJ-Dillashaw-62507');
  await page.waitForXPath('/html/body/div[2]/div[2]/div[1]/section[1]/div/h1/span');

  // select by "xpath"... it's like jQuery selectors for scraping
  // pulling data out of a page into a local var is called "destructuring"
  let elHandle = await page.$x('/html/body/div[2]/div[2]/div[1]/section[1]/div/h1/span');

  let fighterName = await page.evaluate(el => el.textContent, elHandle[0]);

  console.log('Fighter Name:', fighterName);

  await browser.close();
})();