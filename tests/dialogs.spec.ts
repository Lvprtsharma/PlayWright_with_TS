// Alert:
/*
    Test to ensure that alert dialogs are displayed correctly and function as expected.
    By default dialogs are auto-dismisssed by Playwright, so we don't need to handle them manually.
    However, we can register a dialog event handler before triggering the alert to verify its message
        and do dialog.accept() or dialog.dismiss() if needed.
*/

import { test, expect } from '@playwright/test';

test("Simple Alert Dialog", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Handle alert dialog
    page.on("dialog", (dialog) => {
        console.log(`Dialog Tyep: ${dialog.type()}`);
        expect(dialog.type()).toBe("alert");
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe("I am an alert box!");
        dialog.accept();
    });
    await page.locator("#alertBtn").click();
})

test("Confirmation Alert Dialog with accept", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Handle alert dialog
    page.on("dialog", (dialog) => {
        console.log(`Dialog Tyep: ${dialog.type()}`);
        expect(dialog.type()).toBe("confirm");
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe("Press a button!");
        dialog.accept();    // close the dialog by clicking "OK" (default behavior)

    });
    await page.locator("#confirmBtn").click();
    console.log(await page.locator("#demo").innerText());
    expect(await page.locator("#demo").innerText()).toEqual("You pressed OK!");
})

test("Confirmation Alert Dialog with dismiss", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Handle alert dialog
    page.on("dialog", (dialog) => {
        console.log(`Dialog Tyep: ${dialog.type()}`);
        expect(dialog.type()).toBe("confirm");
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe("Press a button!");
        dialog.dismiss();    // close the dialog by clicking "Cancel"

    });
    await page.locator("#confirmBtn").click();
    console.log(await page.locator("#demo").innerText());
    expect(await page.locator("#demo").innerText()).toEqual("You pressed Cancel!");
})

test("Prompt Alert with input", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Handle alert dialog
    page.on("dialog", (dialog) => {
        console.log(`Dialog Type: ${dialog.type()}`);
        expect(dialog.type()).toBe("prompt");
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe("Please enter your name:");

        expect(dialog.defaultValue()).toContain("Harry Potter"); // verify default value in the prompt input box
        dialog.accept("John");    // We can pass input text to the prompt dialog by providing string to dialog.accept()

    });
    await page.locator("#promptBtn").click();
    console.log(await page.locator("#demo").innerText());
    expect(await page.locator("#demo").innerText()).toEqual("Hello John! How are you today?");
})

test("Prompt Alert cancellation", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Handle alert dialog
    page.on("dialog", (dialog) => {
        console.log(`Dialog Type: ${dialog.type()}`);
        expect(dialog.type()).toBe("prompt");
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe("Please enter your name:");
        dialog.dismiss();    // close the prompt dialog by clicking "Cancel"
    });
    await page.locator("#promptBtn").click();
    console.log(await page.locator("#demo").innerText());
    expect(await page.locator("#demo").innerText()).toEqual("User cancelled the prompt.");
})
