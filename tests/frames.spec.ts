// Frames:
/*
    iFrames - Inline Frames
    Frames are used to embed another HTML document within the current document.
    They are defined using the <iframe> tag.
    Frames can be used to display content from another source, such as an external website or a different section of the same website.
    Frames can be useful for displaying advertisements, videos, or other types of content that need to be isolated from the main page.
*/

import { test, expect, Frame, FrameLocator } from '@playwright/test';

test("Frames Demo - Using page.frame()", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    // Get all frames on the page. It returns an array of Frame objects.
    const frames:Frame[] = page.frames();
    console.log("Total Frames on the Page: " + frames.length); // Total Frames on the Page: 7

    // Get the names of all frames on the page.
    console.log("Frame Names: ");
    frames.forEach(frame => {
        console.log("Frame name - ",frame.name());
    });
    
    // Using page.frame() has only two options to identify a frame:
    // 1. By name
    // 2. By URL

    const frame1: null | Frame = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1.html" })
    if(frame1){
        // There are two ways to interact with elements inside a frame.
        // Approach 1:
        // await frame1.locator("input[name='mytext1']").fill("Hello Frame 1 - Approach 1");
        await frame1.fill("input[name='mytext1']", "Hello Frame 1 - Approach 1");

        // Adding delay to see the filled text in the input boxes.
        await page.waitForTimeout(1000);

        // Approach 2: using frameLocator()
        await frame1.locator("input[name='mytext1']").fill("Hello Frame 1 - Approach 2");

        // Adding delay to see the filled text in the input boxes.
        await page.waitForTimeout(1000);
    }
    else{
        console.log("Frame not found!");
    }

});

test("Frames Demo - Using page.frameLocator()", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3: FrameLocator = page.frameLocator("frame[src='frame_3.html']");
    const input3 = frame3.locator("input[name='mytext3']");
    await input3.fill("Hello Frame 3 - Using frameLocator");

    // Adding delay to see the filled text in the input boxes.
    await page.waitForTimeout(1000);

});


test("Inner/Child Frames", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3: null | Frame = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});

    if(frame3){
        const input3 = frame3.locator("input[name='mytext3']");
        await input3.fill("Hello Frame 3 - Using frameLocator");

        const childframes:Frame[] = frame3.childFrames();
        console.log("Total Child Frames inside Frame 3: " + childframes.length); // Total Child Frames inside Frame 3: 1

        const radioButton = childframes[0].getByLabel("I am a human");
        await radioButton.click();

        await expect(radioButton).toBeChecked();

        // Adding delay to see the filled text in the input boxes.
        await page.waitForTimeout(1000);
    }
    else{
        console.log("Frame not found!");
    }
});




/*
Key Differences

page.frameLocator() (Recommended)
1. Auto-waiting: It automatically waits for the iframe to appear in the DOM before attempting to find elements inside it.
2. Resilience: It is less "flaky" because it re-locates the frame if the page re-renders.
3. Usage: Returns a FrameLocator object. You chain it directly with other locators to perform actions.
4. Example: await page.frameLocator('#my-iframe').getByText('Submit').click();
5. Strictness: It is strict by default; if the selector matches multiple iframes, it will throw an error.

page.frame() (Legacy/Limited Use)
1. Manual Handling: It returns a Frame object based on specific identifiers like the name attribute or a url.
2. Racy Behavior: It does not have built-in auto-waiting for the frame itself. If the frame is not yet attached when the code runs, it may return null, leading to test failures.
3. Usage: You typically store the frame in a variable and then call methods on it.
4. Example: const frame = page.frame({ name: 'frame-name' }); await frame.fill('#input', 'value');
5. Best For: Scenarios where you need to check frame properties (like url() or childFrames()) rather than just interacting with elements. 

Summary                             Comparison
Feature 	        page.frameLocator()	                    page.frame()
Return Type	            FrameLocator	                        Frame
Auto-waiting    	Yes (waits for iframe to exist)	        No (returns null if not found immediately)
Selector Type	    Any selector (CSS, XPath, etc.)	        Name or URL only
Flakiness	        Low (handles dynamic pages well)	    High (racy on dynamic content)
Chaining	        Highly chainable	                    Requires intermediate variable or check

*/
