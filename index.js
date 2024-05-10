const express = require('express');
const puppeteer = require('puppeteer');
require('dotenv').config();

const getList = async res => {
  // // Launch the browser and open a new blank page
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // // Navigate the page to a URL
  // await page.goto(
  //   'https://www.ebay.com/sellercenter/ebay-for-business/verified-rights-owner-program'
  // );

  // // Set screen size
  // await page.setViewport({ width: 1080, height: 1024 });

  // const list = await page.$$eval('.appendix-item__link-group > a', links =>
  //   links.map(link => link.innerText)
  // );

  // await browser.close();
  // return list;
  const browser = await puppeteer.launch({
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
    // res.send(`Something went wrong while running Puppeteer: ${e}`);
    console.log(e);
    res.status(500).json("Coldn't get the list.");
  } finally {
    await browser.close();
  }
};

const app = express();

// Specify a port number for the server
const PORT = process.env.PORT || 5000;
// Start the server and listen to the port
app.listen(PORT, process.env.IP, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create a route and a handler for GET /
app.get('/', async (req, res) => {
  // Send the array as a JSON response
  await getList(res);

  // list.length > 0 ? res.status(200).json(list) : res.status(500).json("Coldn't get the list.");
});
