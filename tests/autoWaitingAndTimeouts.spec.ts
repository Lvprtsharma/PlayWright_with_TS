
import { test, expect, Frame, FrameLocator, Locator, chromium } from '@playwright/test';

/*
    Assertions are of two types:

    1. Auto-retrying assertions: These assertions are retried automatically until they pass or the timeout is reached.
        These work on page elements.
        Examples: toBeVisible, toHaveText, toHaveURL, toHaveTitle, toHaveAttribute, toHaveClass, toHaveCount, etc.
        These assertions will keep retrying until the condition is met or the timeout is reached.
        We have to use await with these assertions. As they return a promise.
        Timeout is possible with these assertions.

    2. Non-retrying assertions: These assertions are not retried automatically. These work only on values.
        Examples: toBe, toEqual, toBeLessThan, toBeGreaterThan, etc.
        These assertions are evaluated only once.
        We don't have to use await with these assertions. As they don't return a promise.
        Timeout is not possible with these assertions.

    Autowaiting: Playwright automatically waits for elements to be ready before performing actions or assertions.
    Actionability checks: Playwright performs actionability checks to ensure that elements are in a suitable state for interaction.
    Timeouts: We can set timeouts for actions and assertions.
    Force option: We can use the force option to bypass actionability checks when performing actions on elements.

*/


test("Autowaiting and forcing", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');

    // Autowaiting - Playwright automatically waits for elements to be ready before performing actions or assertions.
    // Actionability checks - Playwright performs actionability checks to ensure that elements are in a suitable state for interaction.
    // In autowaiting, Playwright waits for elements to be visible, enabled, and stable before performing actions like click, fill, etc.
    // Max 30 seconds wait time for autowaiting by default, can be changed using setDefaultTimeout method.
    // Assertion - auto waiting for the element to be visible
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('text=Welcome to our store')).toBeVisible();

    // Actions - auto waiting for the element to be actionable
    // Force - when we want to avoid actionalibility checks then we can use force option
    await page.locator("#small-searchterms").fill("ABCDEF", {force: true});
    await page.locator("input[value='Search']").click({force: true});

    // Timeouts - we can set timeouts for actions and assertions
    // We can set timeout for specific action or assertion using timeout option
    await expect(page.locator('text=No products were found that matched your criteria.')).toBeVisible({timeout: 10000});

    // We can set default timeout for all actions and assertions two ways are there:
    // 1. playwright.config.ts file (global setting)
    // 2. Using setDefaultTimeout method (per test basis)
    // await test.setTimeout(60000); // sets timeout for each test
    // await page.setDefaultTimeout(45000); // sets default timeout for all actions and assertions on the page

    // In order to slow down the execution we can use time.slow(). It will slow down the execution by 3 times.
    test.slow();  // if default is 30 seconds then it will become 90 seconds.
    
    await browser.close();

});

test("Assertion Demo", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
 
    // 1. Auto-retrying assertions
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('text=Welcome to our store')).toBeVisible();
    await expect(page.locator("div[class='product-grid home-page-product-grid'] strong")).toHaveText(/featured products/i);

    // 2. Non-retrying assertions
    const title = await page.title();
    expect(title).toBe('Demo Web Shop');

    // 3. Negative match with auto-retrying assertion
    await expect(page.locator('text=Welcome to our shop')).not.toBeVisible();

    // 4. Negative match with non-retrying assertion
    const url = page.url();
    expect(url).not.toBe('https://demowebshop.tricentis.com/wrongpage');
    
    await browser.close();
});