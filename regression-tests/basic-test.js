const puppeteer = require('puppeteer')
const {expect} = require('chai');

describe('Basic test', async () => {
    it('should launch chrome browser and check for title', async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({width:1125, height:927});
        await page.goto("https://v8.dev/");
        const title = await page.$eval('#main h1',
                header => header.textContent);
        expect(title).equals("What is V8?");
        await browser.close();

    });
});
