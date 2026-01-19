import {test, expect} from "@playwright/test";

/*

Syntac of writing test:

test("title", ()=>{

    test step 1
    test step 2
    .....
})

*/

// Playwrgiht has predefined fixtures/global variables: page, browser



test("Verify page title", async ({page})=>{

    await page.goto("https://automationexercise.com/");
    let title: string = await page.title();
    console.log(`Title of the page: ${title}`);
    await expect(page).toHaveTitle("Automation Exercise");

})


