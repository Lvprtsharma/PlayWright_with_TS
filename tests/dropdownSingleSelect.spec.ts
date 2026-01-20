import {test, expect, Locator} from "@playwright/test";


test("Single Select Dropdown handling", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    // 1. select option from the dropdown (4 ways)
    await page.locator("#country").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.locator("#country").selectOption("India"); // By visible text
    await page.waitForTimeout(1000);
    await page.locator("#country").selectOption({value: "uk"}); // By value attribute
    await page.waitForTimeout(1000);
    await page.locator("#country").selectOption({label: "China"}); //By label 
    await page.waitForTimeout(1000);
    await page.locator("#country").selectOption({index: 4}); // By index
    await page.waitForTimeout(1000);

    // 2. Check number of options in the dropdown
    const dropdownOptions: Locator = page.locator("#country > option");
    await expect(dropdownOptions).toHaveCount(10);
    
})

test("Check number of options in the dropdown", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const dropdownOptions: Locator = page.locator("#country > option");
    await expect(dropdownOptions).toHaveCount(10);
    
})

test("Check option is present or not", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const dropdownOptions: Locator = page.locator("#country > option");
    const allOptions: string[] = (await dropdownOptions.allTextContents()).map(option => option.trim());

    expect(allOptions).toContain("India");
})
