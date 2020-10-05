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

    it('iphone X view', async () => {
        const iphone = await puppeteer.devices['iPhone X'];
        await page.emulate(iphone);
        const header = await page.$('h1');
        const title = await page.evaluate((header) => header.textContent, header);
        expect(title).equals('Chrome DevTools Protocol');
    });

    it('Blackberry view', async () => {
        //can emulate directly
        await page.emulate({
            name: 'Blackberry PlayBook',
            userAgent:
                'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
            viewport: {
                width: 600,
                height: 1024,
                deviceScaleFactor: 1,
                isMobile: true,
                hasTouch: true,
                isLandscape: false,
            },
        })
        //can give viewport specs as well
        // await page.setViewport({
        //     width: 375,
        //     width: 600,
        //     height: 1024,
        //     deviceScaleFactor: 1,
        //     isMobile: true,
        //     hasTouch: true,
        //     isLandscape: false,
        // })
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
