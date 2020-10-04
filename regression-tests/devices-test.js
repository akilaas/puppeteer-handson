const puppeteer = require('puppeteer')
const {expect} = require('chai');

describe('Devices test', async () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        });
        page = await browser.newPage();
        await page.goto("https://chromedevtools.github.io/devtools-protocol/");
    })

    it('iphone X  view', async () => {
        const iphone = await puppeteer.devices['iphone X'];
        await page.emulate(iphone);
        await page.waitForTimeout(5000);
        const header = await page.$('h1');
        const title = await page.evaluate((header) => header.textContent, header);
        expect(title).equals('Chrome DevTools Protocol');
    });

    it('Pixel 2 view', async () => {
        const pixel = await puppeteer.devices['Pixel 2'];
        await page.emulate(pixel);
        const header = await page.$('h1');
        const title = await page.evaluate((header) => header.textContent, header);
        expect(title).equals('Chrome DevTools Protocol');
    });

    afterEach(async () => {
        await browser.close();
    })

});
