import {test, expect, Locator} from '@playwright/test';


// Handling Text Input Fields
test('Text input actions', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const name:Locator = page.locator('#name');

    await expect(name).toBeVisible();
    await expect(name).toBeEnabled();

    const maxLength:any = await name.getAttribute('maxLength');  // retrieving attribute value

    expect(parseInt(maxLength)).toBe(15);

    await name.fill("John Kenedy");

    // TextContent() will not return value for input field because it is used to get the text inside an element
    // console.log("Enter value : ",await name.textContent());

    // To get value from input field use 'inputValue()' method
    const enteredName:string = await name.inputValue()
    console.log("Enter value : ", enteredName);
    
})

// Radio Button Handling
test.only('Radio button actions', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const maleRadio:Locator = page.locator("#male")

    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);

    await maleRadio.check();
    expect(await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked();

})

// Checkbox Handling
test.only('Checkbox actions', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    // 1. Select specific checkbox using label and assert
    const sundayCheckbox:Locator = page.getByLabel("Sunday")

    await expect(sundayCheckbox).toBeVisible();
    await expect(sundayCheckbox).toBeEnabled();
    expect(await sundayCheckbox.isChecked()).toBe(false);

    await sundayCheckbox.check();
    expect(await sundayCheckbox.isChecked()).toBe(true);
    await expect(sundayCheckbox).toBeChecked();

    // 2. Select multiple checkboxes using loop
    const days:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const daysCheckboxes:Locator[] = days.map(day => page.getByLabel(day));
    expect(daysCheckboxes.length).toBe(7);

    for(const dayCheckbox of daysCheckboxes) {
        await expect(dayCheckbox).toBeVisible();
        await expect(dayCheckbox).toBeEnabled();

        await dayCheckbox.check();
        expect(await dayCheckbox.isChecked()).toBe(true);
        await expect(dayCheckbox).toBeChecked();
    }

    // 3. Check/Uncheck last 3 checkboxes from the list of all checkboxes
    // We can use slice method on array returned by 'all()' method of locator

    for(const dayCheckbox of daysCheckboxes.slice(-3)) {
        await expect(dayCheckbox).toBeVisible();
        await expect(dayCheckbox).toBeEnabled();

        await dayCheckbox.uncheck();
        expect(await dayCheckbox.isChecked()).toBe(false);
        await expect(dayCheckbox).not.toBeChecked();
    }

    // 4. Toggle Checkboxes: if checked then uncheck else check. Assert flipped state

    for(const dayCheckbox of daysCheckboxes) {
        await expect(dayCheckbox).toBeVisible();
        await expect(dayCheckbox).toBeEnabled();
        
        if (await dayCheckbox.isChecked()) {
            await dayCheckbox.uncheck();
            expect(await dayCheckbox.isChecked()).toBe(false);
            await expect(dayCheckbox).not.toBeChecked();
        } else {
            await dayCheckbox.check();
            expect(await dayCheckbox.isChecked()).toBe(true);
            await expect(dayCheckbox).toBeChecked();
        }
    }

    // 5. Randomly select checkboxes: Select checkboxes at even index positions

    for (const index in daysCheckboxes) {
        if (parseInt(index + 1) % 2 === 0) {
            const dayCheckbox = daysCheckboxes[index];
            await dayCheckbox.check();
            expect(await dayCheckbox.isChecked()).toBe(true);
            await expect(dayCheckbox).toBeChecked();
        }
        else{
            const dayCheckbox = daysCheckboxes[index];
            await dayCheckbox.uncheck();
            expect(await dayCheckbox.isChecked()).toBe(false);
            await expect(dayCheckbox).not.toBeChecked();
        }
    }
})








