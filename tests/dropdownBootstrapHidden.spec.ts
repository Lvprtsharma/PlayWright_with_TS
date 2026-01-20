import {test, expect, Locator} from "@playwright/test"

test("Bootstrap hidden dropdown", async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[placeholder='Username']").fill("Admin");
    await page.locator("input[placeholder='Password']").fill("admin123");
    await page.locator("button[type='submit']").click();

    await page.getByText("PIM").click();
    await page.locator("form i").nth(2).click();
    await page.waitForTimeout(1000);

    const options:Locator = page.locator("div[role='listbox'] span");
    const optionsCount:number = await options.count();
    console.log(`Total number of options: ${optionsCount}`);
    console.log(await options.allTextContents());

    for(let i=0; i<optionsCount; i++){
        console.log(`${await options.nth(i).textContent()}`);
    }

})


