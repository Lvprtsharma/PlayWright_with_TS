import { test, expect, Frame, FrameLocator, Locator } from '@playwright/test';

test("Frames Assignment", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");
    await page.setViewportSize({ width: 1280, height: 800 });

    const frame1: FrameLocator = page.frameLocator("frame[src='frame_1.html']");
    const input1 = frame1.locator("input[name='mytext1']");
    await input1.fill("Hello Frame 1 - Using frameLocator");
    expect(input1).toHaveValue("Hello Frame 1 - Using frameLocator");

    const frame2: FrameLocator = page.frameLocator("frame[src='frame_2.html']");
    const input2 = frame2.locator("input[name='mytext2']");
    await input2.fill("Hello Frame 3 - Using frameLocator");
    expect(input2).toHaveValue("Hello Frame 3 - Using frameLocator");

    const frame3: FrameLocator = page.frameLocator("frame[src='frame_3.html']");
    const input3 = frame3.locator("input[name='mytext3']");
    await input3.fill("Hello Frame 3 - Using frameLocator");
    expect(input3).toHaveValue("Hello Frame 3 - Using frameLocator");

    const frame4: FrameLocator = page.frameLocator("frame[src='frame_4.html']");
    const input4 = frame4.locator("input[name='mytext4']");
    await input4.fill("Hello Frame 4 - Using frameLocator");
    expect(input4).toHaveValue("Hello Frame 4 - Using frameLocator");

    const frame5: FrameLocator = page.frameLocator("frame[src='frame_5.html']");
    const input5 = frame5.locator("input[name='mytext5']");
    await input5.fill("Hello Frame 5 - Using frameLocator");
    expect(input5).toHaveValue("Hello Frame 5 - Using frameLocator");

    const frame5UrlLink:Locator = frame5.locator("a[href='https://a9t9.com']");
    await frame5UrlLink.scrollIntoViewIfNeeded();
    await frame5UrlLink.click();
    const uiVisionLogo:Locator = frame5.getByAltText("Ui.Vision by a9t9 software - Image-Driven Automation");
    await expect(uiVisionLogo).toBeVisible({timeout:10000});

    // Adding delay to see the filled text in the input boxes.
    await page.waitForTimeout(1000);

});