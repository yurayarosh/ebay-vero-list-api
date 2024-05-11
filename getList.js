const puppeteer = require("puppeteer");
require("dotenv").config();

const getList = async res => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(
      'https://www.ebay.com/sellercenter/ebay-for-business/verified-rights-owner-program'
    );

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const list = await page.$$eval('.appendix-item__link-group > a', links =>
      links.map(link => link.innerText)
    );
    res.status(200).json(list);
  } catch (e) {
    console.log(e);
    res.status(500).json(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { getList };
