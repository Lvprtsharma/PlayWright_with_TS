import { test, expect, Frame, FrameLocator, Locator, chromium } from '@playwright/test';


test("Handle Tabs", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const parentPage = await context.newPage();

    await parentPage.goto('https://testautomationpractice.blogspot.com/');

    // Method 1: Using Promise.all to handle the new tab because the new tab opens after a user action
    // This ensures that we are waiting for the new tab to open before proceeding

    // await context.waitForEvent('page');
    // await parentPage.locator("button:has-text('New Tab')").click();

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        parentPage.locator("button:has-text('New Tab')").click()
    ]);

    // Approach 1: switch between pages and get the title (using page object)
    const pages = context.pages();  // returns all the pages in the context including parent and child pages
    for (const p of pages) {
        console.log(await p.title());
    }
    
    // Approach 2: directly using the page object
    console.log("Parent Page Title: " + await parentPage.title());
    console.log("Child Page Title: " + await childPage.title());

});
 

test("Handle Popups", async ({browser}) => {

    const context = await browser.newContext();    
    const parentPage = await context.newPage();

    await parentPage.goto('https://testautomationpractice.blogspot.com/');

    // Method 1: Using Promise.all to handle the new tab because the new tab opens after a user action
    // This ensures that we are waiting for the new tab to open before proceeding

    // await context.waitForEvent('page');
    // await parentPage.locator("button:has-text('New Tab')").click();

    await Promise.all([
        parentPage.waitForEvent('popup'),
        parentPage.locator("#PopUp").click()
    ]);

    await parentPage.waitForTimeout(5000); // wait for 5 seconds to allow popup to open

    // Approach 1: switch between pages and get the title (using page object)
    const allPopups = context.pages();  // returns all the pages in the context including parent and child pages
    await allPopups[0].waitForLoadState("domcontentloaded"); // wait for the first popup to load
    console.log("All Popups pages: ", allPopups.length);
    
    for (const p of allPopups) {
        console.log(await p.title());
    }

});
 

test("Authenticated Popups", async ({browser}) => {

    const context = await browser.newContext({httpCredentials: {username: 'admin', password: 'admin'}});    
    const parentPage = await context.newPage();

    await parentPage.goto('https://the-internet.herokuapp.com/basic_auth');

    // In authenticated popups, the popup appears as soon as we navigate to the page
    // So we don't need to wait for a user action to open the popup
    // We can pass the credentials in the URL itself
    // Syntax: https://username:password@url
    // We can also pass the credentials in the browser context as shown above
    // Both methods work the same way

    const successMessage = await parentPage.getByText('Congratulations! You must have the proper credentials.').textContent();
    console.log("Success Message: " + successMessage);
    await expect(successMessage).toContain('Congratulations! You must have the proper credentials.');

});
 