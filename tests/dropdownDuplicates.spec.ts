import {test, expect, Locator} from "@playwright/test";


test("Verify dropdown contains Duplicates", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    // 1. select option from the dropdown (4 ways)
    // const dropdownOption:Locator = page.locator("#colors>option"); // with duplicates
    const dropdownOption:Locator = page.locator("#animals>option"); // no duplicates
    console.log("Total options in the dropdown: " + await dropdownOption.count());

    const optionsText:string[] = (await dropdownOption.allTextContents()).map(option => option.trim());
    const originalOptions: string[] = optionsText;
    console.log("Original Options: ", originalOptions);

    const mySet: Set<string> = new Set<string>();
    const duplicates: string[] = [];

    for(const text of originalOptions){
        if (mySet.has(text)){
            duplicates.push(text);
        }
        else{
            mySet.add(text);
        }
    }

    if (duplicates.length > 0) {
        console.log("Duplicate values: ", duplicates)
    }
    else {
        console.log("No Duplicates")
    }

    expect(duplicates.length).toBe(0);

})

test("Assignment - Sort Order checking", async ({page}) => {

    await page.goto("https://bstackdemo.com/")

    const orderBy = page.locator("//div[normalize-space(text())= 'Order by']/select")

    await orderBy.selectOption({value: "lowestprice"});
    await page.waitForTimeout(2000);

    const allPrices:string[] = await page.locator("div[class='val']").allInnerTexts();
    const allPrice:number[] = allPrices.map(price => parseFloat(price.replace(/[^0-9.]/g, "")))


    const originalPrices: number[] = [...allPrice]
    console.log(`Original Prices: ${originalPrices}`);

    const sortedPrices: number[] = [...allPrice].sort((a, b) => a - b)
    console.log(`Sorted Prices: ${sortedPrices}`);

    expect(originalPrices).toEqual(sortedPrices)
    
})