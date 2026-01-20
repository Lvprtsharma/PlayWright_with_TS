import {test, expect, Locator} from "@playwright/test";


test("Multi Select Dropdown handling", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    // 1. select option from the dropdown (4 ways)
    await page.locator("#colors").scrollIntoViewIfNeeded();
    await page.locator("#colors").selectOption(["red", "blue"]);  // By visible text
    await page.waitForTimeout(1000);
    await page.locator("#colors").selectOption([{value: "green"}, {value: "yellow"}]); // By value attribute
    await page.waitForTimeout(1000);
    await page.locator("#colors").selectOption([{label: "Green"}, {label: "White"}]); //By label 
    await page.waitForTimeout(1000);
    await page.locator("#colors").selectOption([{index: 0}, {index: 5}]); // By index
    await page.waitForTimeout(1000);

})

test("Check number of options in the dropdown", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const dropdownOptions: Locator = page.locator("#colors > option");
    await expect(dropdownOptions).toHaveCount(7);
    
})

test("Check option is present or not", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const dropdownOptions: Locator = page.locator("#colors > option");
    const allOptions: string[] = (await dropdownOptions.allTextContents()).map(option => option.trim());
    expect(allOptions).toContain("Red");
})