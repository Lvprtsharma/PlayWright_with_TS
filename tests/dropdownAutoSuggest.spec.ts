import {test, expect, Locator} from "@playwright/test"

test("Autosuggest dropdown", async ({page}) => {

    await page.goto("https://www.flipkart.com/");

    await page.locator("input[name='q']").fill("smart");
    await page.waitForTimeout(2000);

    // Get all the suggested options --> ctrl+shift+p on DOM --> emulate focused page

    const options:Locator = page.locator("ul>li")
    const count = await options.count() 
    console.log(`Number of suggested options : ${count}`)
    console.log( `First option is ${await options.nth(2).innerText()}`)
    console.log(`All options are ${await options.allTextContents()}`)

    for(let i=0; i<count; i++){
        // console.log(await options.nth(i).innerText())
        console.log(await options.nth(i).textContent())
    }

    for(let i=0; i<count; i++){
        const text:any = await options.nth(i).textContent();
        
        if (text.toLowerCase() === "smartphone"){
            await options.nth(i).click();
            break;
        }
    }



})

