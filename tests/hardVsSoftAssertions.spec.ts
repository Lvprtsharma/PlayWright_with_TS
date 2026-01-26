import { test, expect, Frame, FrameLocator, Locator, chromium } from '@playwright/test';

/*
    Assertions are of two types:

    1. Hard assertions: These assertions will stop the test execution if any single assertion fail.
        Examples: toBe, toEqual, toBeLessThan, toBeGreaterThan, etc.
        These assertions are evaluated only once.
        We don't have to use await with these assertions. As they don't return a promise.
        Timeout is not possible with these assertions.
        
    2. Soft assertions: These assertions will not stop the test execution if they fail.
        Examples: toBeVisible, toHaveText, toHaveURL, toHaveTitle, toHaveAttribute, toHaveClass, toHaveCount, etc.
        These assertions will keep retrying until the condition is met or the timeout is reached.
        We have to use await with these assertions. As they return a promise.
        Timeout is possible with these assertions.

    Soft assertions are also known as auto-retrying assertions.
    Soft assertions work on page elements.
    Hard assertions work only on values.

*/


test("Autowaiting and forcing", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');

    // Hard Assertion - if this assertion fails, the test execution will stop here.
    const title = await page.title();
    expect(title).toBe("Demo Web Shop");  // Hard assertion

    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect(logo).toBeVisible();

    // Soft Assertion - if this assertion fails, the test execution will stop here.
    expect.soft(title).toBe("Demo Web ShOP");  // Soft assertion
    await expect.soft(logo).toBeVisible();
});
