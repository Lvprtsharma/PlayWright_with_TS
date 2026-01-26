import { test, expect, Locator, Page } from "@playwright/test";

async function selectDate(targetYear: string, targetMonth: string, targetDate: string,
    page: Page, isCheckInDate: boolean) {

    while (true) {

        let calendarMonthYear: string = ''

        if (isCheckInDate) {
            calendarMonthYear = await page.locator("h3[aria-live='polite']").first().innerText();
        }
        else {
            calendarMonthYear = await page.locator("h3[aria-live='polite']").last().innerText();
        }

        const currentMonth: string = calendarMonthYear.split(" ")[0]
        const currentYear: string = calendarMonthYear.split(" ")[1]

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }
        else {
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    const allDates: Locator[] = await page.locator("table.b8fcb0c66a").nth(0).locator('td').all();

    for (let dt of allDates) {
        const calendarDate: string = await dt.innerText();
        if (calendarDate == targetDate) {
            await dt.click();
            break;
        }
    }
}


test.skip("Verify Bootstrap DatePicker", async ({ page }) => {

    await page.goto('https://www.booking.com')

    const checkInCheckOutCalendar: Locator = page.getByTestId("searchbox-dates-container");
    const checkInDate: Locator = page.getByTestId("date-display-field-start");
    const checkOutDate: Locator = page.getByTestId("date-display-field-end");
    await expect(checkInCheckOutCalendar).toBeVisible();

    await page.waitForLoadState("domcontentloaded");
    const dismissSignIn: Locator = page.getByRole('button', { name: 'Dismiss sign-in info.' })
    if (await dismissSignIn.isVisible({ timeout: 3000 })) {
        await dismissSignIn.click();
    }

    await checkInCheckOutCalendar.click(); // open date calender
    await selectDate("2026", "December", "31", page, true);
    await expect(checkInDate).toContainText("Dec 31");

})