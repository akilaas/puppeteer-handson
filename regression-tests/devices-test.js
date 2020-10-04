const puppeteer = require('puppeteer')
const {expect} = require('chai');

describe('Devices test', async () => {
    it('iphone X  view', async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const mobile = await puppeteer.devices['iphone X'];
        await page.emulate(mobile);
        await page.goto("https://chromedevtools.github.io/devtools-protocol/");
        const header = await page.$('h1');
        const title = await page.evaluate((header) => header.textContent, header);
        expect(title).equals('Chrome DevTools Protocol');
        await browser.close();

    });
});
