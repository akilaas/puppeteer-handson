const puppeteer = require('puppeteer')
const {expect} = require('chai');

//slow3g, fast4g,aero mode - all in different devices too
describe('Network coverage', async () => {
    let browser;
    let page;
    let client;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        });
        page = await browser.newPage();

        client = await page.target().createCDPSession();
        await client.send("Network.enable");

    })

    it('should emulate iphone8 in fast 3g mode', async () => {
        const fast3G = {
            // Network connectivity is absent
            offline: false,
            // Download speed (bytes/s)
            downloadThroughput: ((400 * 1024) / 8) * 0.8,
            // Upload speed (bytes/s)
            uploadThroughput: ((400 * 1024) / 8) * 0.8,
            // Latency (ms)
            latency: 400 * 5,
        }
        //simulate network throttling for fast 3g
        await client.send("Network.emulateNetworkConditions", fast3G);
        await client.send("Emulation.setCPUThrottlingRate", {rate: 4});
        await page.emulate(puppeteer.devices["iPhone 8"]);
        await page.goto("https://v8.dev/", {waitUntil: "networkidle0"});
        const content = await page.$eval('#main h2',
            cont => cont.textContent);
        expect(content).equals('Latest blog posts');
    });

    it.only('should emulate iphone8 in aeroplane mode?', async () => {
        const aeroMode = {
            // Network connectivity is absent
            offline: true,
            // Download speed (bytes/s)
            downloadThroughput: 0,
            // Upload speed (bytes/s)
            uploadThroughput: 0,
            // Latency (ms)
            latency: 0,
        }
        //simulate network throttling for aeroplane mode
        await client.send("Network.emulateNetworkConditions", aeroMode);
        await page.emulate(puppeteer.devices["iPhone 8"]);
        await page.goto("https://chromedevtools.github.io/devtools-protocol/", {waitUntil: "networkidle0"});
        await page.waitFor(5000);
        const content = await page.$eval('.error-code',
            cont => cont.textContent);
        expect(content).equals('ERR_INTERNET_DISCONNECTED');
    });

    it('should emulate galaxy in slow3g mode', async () => {
        const slow3G = {
            // Network connectivity is absent
            offline: false,
            // Download speed (bytes/s)
            downloadThroughput: ((500 * 1024) / 8) * 0.8,
            // Upload speed (bytes/s)
            uploadThroughput: ((500 * 1024) / 8) * 0.8,
            // Latency (ms)
            latency: 400 * 5,
        }
        //simulate network throttling for slow 3g
        await client.send("Network.emulateNetworkConditions", slow3G);
        await client.send("Emulation.setCPUThrottlingRate", {rate: 4});
        await page.emulate(puppeteer.devices["Galaxy S5"]);
        await page.goto("https://v8.dev/", {waitUntil: "networkidle0"});
        const content = await page.$eval('#main h2',
            cont => cont.textContent);
        expect(content).equals('Latest blog posts');
    });


    afterEach(async () => {
        await browser.close();
    })
});
