import { test, expect, Locator, Page } from "@playwright/test";

async function selectDate(targetYear: string, targetMonth: string, targetDate: string,
    page: Page, isFuture: boolean, throughDropdown: boolean = false) {

    if (throughDropdown) {
        const monthDropdown: Locator = page.locator("select[aria-label='Select month']");
        const yearDropdown: Locator = page.locator("select[aria-label='Select year']");

        await monthDropdown.selectOption(targetMonth);
        await yearDropdown.selectOption(targetYear);
    }
    else {
        while (true) {

            const currentYear: string = await page.locator(".ui-datepicker-year").innerText();
            const currentMonth: string = await page.locator(".ui-datepicker-month").innerText();

            if (currentMonth === targetMonth && currentYear === targetYear) {
                break;
            }

            if (isFuture) {
                await page.locator("a[title='Next']").click();
            }
            else {
                await page.locator("a[title='Prev']").click();
            }
        }
    }

    const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td").all();

    for (let dt of allDates) {
        const calendarDate: string = await dt.innerText();
        if (calendarDate == targetDate) {
            await dt.click();
            break;
        }
    }
}


test("Verify jQuery DatePicker", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const datePickerInput1: Locator = page.locator("#datepicker");
    const datePickerInput2: Locator = page.locator("#txtDate");

    await datePickerInput1.scrollIntoViewIfNeeded();
    await expect(datePickerInput1).toBeVisible();

    // 1. Using fill method
    await datePickerInput1.fill("01/01/2001");  // mm/dd/yyyy

    // 2. Using date pciker
    await datePickerInput1.click(); // open date calender
    await selectDate("2026", "December", "31", page, true);
    await expect(datePickerInput1).toHaveValue("12/31/2026");

    await datePickerInput1.click(); // open date calender
    await selectDate("2023", "December", "31", page, false);
    await expect(datePickerInput1).toHaveValue("12/31/2023");

    await datePickerInput2.click(); // open date calender
    await selectDate("2023", "Oct", "31", page, false, true);
    await expect(datePickerInput1).toHaveValue("12/31/2023");

})