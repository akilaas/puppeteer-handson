const puppeteer = require("puppeteer");
const {expect} = require("chai");

describe("Offline tests", () => {
    it("should load page when offline", async () => {
        const browser = await puppeteer.launch({headless: false, slowMo: 1000});
        const context = await browser.defaultBrowserContext();
        const page = await context.newPage();
        await page.goto("https://v8.dev/");
        await page.setOfflineMode(true);
        await page.reload({waitUntil: "networkidle0"});
        // const snap = await page.accessibility.snapshot();
        // console.log(snap);
        const content = await page.$eval('#main h2',
            cont => cont.textContent);
        expect(content).equals('Latest blog posts');
        await browser.close();
    });

    it("should not load page when offline", async () => {
        const browser = await puppeteer.launch({headless: false, slowMo: 100});
        const page = await browser.newPage();
        await page.goto("https://chromedevtools.github.io/devtools-protocol/");
        await page.setOfflineMode(true);
        await page.reload({waitUntil:"networkidle0"})
        // page.on('offline', async () => {
        //     console.log('Went offline. Shutting down...');
        //     await browser.close();
        //     process.exit();
        // });
        //const snap = await page.accessibility.snapshot();
        //console.log(snap);
        await page.screenshot({fullPage:true,path:'./screenshots/offline.jpg'})
        await browser.close();
    });
});
