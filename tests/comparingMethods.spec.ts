import {test, expect, Locator} from "@playwright/test"

test("InnerText vs TextContent", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator(".product-title");
    const count = await products.count();

    // InnerText() vs TextContent()
    /*
        innerText() provides only the plain text of the element. It only returns string outcome.
        Whereas textContent provides addition hidden information along with text such as spaces,
            linebreaks or any attribute. It returns either String or Null.
            We have to refine the outcom such as trimmming etc.
        In order to capture the text of all elements we have to use a traditional for loop after knowing the 
        total number of elements.
    */
    console.log("========== innerText() outcome ==========")
    console.log(await products.first().innerText());
    console.log(await products.last().innerText());
    console.log(await products.nth(1).innerText());

    console.log("========== textContent() outcome ==========")
    console.log(await products.first().textContent());
    console.log(await products.last().textContent());
    console.log(await products.nth(1).textContent());

    console.log("========== innerText() outcome using loop ==========")
    for(let i=0; i<count; i++){
        const productInnerText:string = await products.nth(i).innerText();
        console.log(productInnerText);
    }

    console.log("========== textContent() outcome using loop ==========")
    for(let i=0; i<count; i++){
        const productTextContent: string|null = await products.nth(i).textContent();
        console.log(productTextContent?.trim());  // Trimming is applied here
    }

})

test("AllInnerText vs AllTextContent", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator(".product-title");

    // allInnerText() vs allTextContent()
    /*
        Both work on a group of elements and returns an array[].
        Both returns an array of String. But allTextContent() outcome might have hidden spaces also
            so we have to apply map on that outcome array and trim() the outcome.
        All the target elements text can be retrieved at once using both.
    */

    console.log("========== allInnerText() outcome ==========")
    const allProductsInnerText: string[] = await products.allInnerTexts();
    console.log(allProductsInnerText)

    console.log("========== allTextContent() outcome ==========")
    const allProductsTextContent: string[] = await products.allTextContents();
    console.log(allProductsTextContent)

    console.log("========== allTextContent() outcome after map ==========")
    console.log(allProductsTextContent.map(item => item.trim()))

})

test("all", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator(".product-title");

    // all()
    /*
        all() returns the list of all locators in array format. Basically it is used to convert Locators into Locators Array.
        [
            locator('.product-title').first(),
            locator('.product-title').nth(1),
            ....
        ]
        we can use 'for of' and 'for in' loops on above locators now.
        It is mostly used in web tables.

    */

    console.log("========== all() outcome ==========")
    const productLocators: Locator[] = await products.all()
    console.log(productLocators)

    console.log("========== first element in all() outcome ==========")
    console.log(await productLocators[1].innerText())

    console.log("========== for of loop on all() outcome ==========")
    for(let product of productLocators){
        console.log(await product.innerText())
    }

    console.log("========== for in loop on all() outcome ==========")
    for(let index in productLocators){
        console.log(await productLocators[index].innerText())
    }

})

