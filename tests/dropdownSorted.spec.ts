import {test, expect, Locator} from "@playwright/test";


test("Verify dropdown is Sorted", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    // 1. select option from the dropdown (4 ways)
    const dropdownOption:Locator = page.locator("#colors>option");
    // const dropdownOption:Locator = page.locator("#animals>option");
    console.log("Total options in the dropdown: " + await dropdownOption.count());

    const optionsText:string[] = (await dropdownOption.allTextContents()).map(option => option.trim());
    const originalOptions: string[] = optionsText;
    console.log("Original Options: ", originalOptions);

    const sortedOptions: string[] = optionsText.sort();
    console.log("Sorted Options: ", sortedOptions);

    // sort() is mutating the original array, so we need to create a copy of the original array before sorting.
    // Or we can use ... spread operator to create a new array
    // const sortedOptions: string[] = [...originalOptions].sort();

    expect(originalOptions).toEqual(sortedOptions);

})
