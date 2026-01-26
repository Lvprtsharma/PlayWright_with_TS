import { test, expect, Frame, FrameLocator, Locator, chromium, firefox, webkit } from '@playwright/test';

/*

    Browser --> Context --> Pages --> Frames
    Browser can be Chromium, Firefox, Webkit
    Browser can have multiple Contexts

    Context is an isolated incognito-like session within a browser
    We can have multiple contexts in a single browser instance and each context can have multiple pages/tabs
    It provides a way to separate cookies, local storage, and cache between different sessions
    Each context can have its own viewport size, user agent, and other settings. It can have multiple pages/tabs.

    Pages are individual tabs within a browser context. New tab, new window and pop-ups are all considered pages.
    Each page can have multiple frames (iframes).

*/

test("Custom Browsers", async () => {
    // Create three separate browsers
    const browser1 = await chromium.launch();
    const browser2 = await firefox.launch();
    const browser3 = await webkit.launch();

    const context1 = await browser1.newContext();
    const context2 = await browser2.newContext();
    const context3 = await browser3.newContext();

    // Create a new page in each context
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    const page3 = await context3.newPage();

    // Navigate to a sample website in both pages
    await page1.goto('https://example.com');
    await page2.goto('https://example.com');
    await page3.goto('https://example.com');

    // Set a cookie in the first context
    await context1.addCookies([{ name: 'testCookie', value: 'context1', domain: 'example.com', path: '/' }]);

    // Verify that the cookie is present in the first context
    const cookiesContext1 = await context1.cookies('https://example.com');
    expect(cookiesContext1.find(cookie => cookie.name === 'testCookie')?.value).toBe('context1');

    // Verify that the cookie is not present in the second context
    const cookiesContext2 = await context2.cookies('https://example.com');
    expect(cookiesContext2.find(cookie => cookie.name === 'testCookie')).toBeUndefined();

    const cookiesContext3 = await context3.cookies('https://example.com');
    expect(cookiesContext3.find(cookie => cookie.name === 'testCookie')).toBeUndefined();

    // Clean up
    await context1.close();
    await context2.close();
    await context3.close();
    await browser1.close();
    await browser2.close();
    await browser3.close();
});

test("Browser Context - Isolated Sessions", async ({ browser }) => {
    // Create two separate browser contexts
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    // Create a new page in each context
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Navigate to a sample website in both pages
    await page1.goto('https://example.com');
    await page2.goto('https://example.com');

    // Set a cookie in the first context
    await context1.addCookies([{ name: 'testCookie', value: 'context1', domain: 'example.com', path: '/' }]);

    // Verify that the cookie is present in the first context
    const cookiesContext1 = await context1.cookies('https://example.com');
    expect(cookiesContext1.find(cookie => cookie.name === 'testCookie')?.value).toBe('context1');

    // Verify that the cookie is not present in the second context
    const cookiesContext2 = await context2.cookies('https://example.com');
    expect(cookiesContext2.find(cookie => cookie.name === 'testCookie')).toBeUndefined();

    // Clean up
    await context1.close();
    await context2.close();
});
