import { test, expect, Locator, Page } from "@playwright/test";
import { stat } from "node:fs";


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

test("Assignment Dummy Booking", async ({ page }) => {

    const orderToSelect: string = "Dummy hotel booking";
    let expectedPrice: string = "";
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

    const header: Locator = page.getByText(/Dummy\s+ticket\s+booking/i);
    await expect(header).toBeVisible();

    const orderList: Locator[] = await page.locator("#opc-product-selection li").all()

    for (let order of orderList) {
        const orderText: string = await order.innerText();
        if (orderText.includes(orderToSelect)) {
            const radioButton: Locator = order.locator("input")
            await radioButton.click();
            break;
        }
    }
    await expect(page.getByRole('alert')).toContainText(orderToSelect);
    expectedPrice = await page.locator(".product-item.selected span.woocommerce-Price-amount.amount").innerText()

    await page.locator("#travname").fill("Love");
    await page.locator("#travlastname").fill("Sharma");

    await page.locator("#dob").click();
    await selectDate("1994", "Mar", "24", page, false, true);
    await expect(page.locator("#dob")).toHaveValue("24/03/1994");
    await page.locator("label[for='sex_1']").click();
    await page.locator("#fromcity").fill("Rampura Phul");
    await page.locator("#tocity").fill("Melbourne");
    await page.locator("#departon").click();
    await selectDate("2026", "Mar", "24", page, false, true);
    await expect(page.locator("#departon")).toHaveValue("24/03/2026");
    await page.locator("#select2-reasondummy-container").click();

    const purposeDropdown: Locator[] = await page.locator("#select2-reasondummy-results li").all();

    for (let purpose of purposeDropdown) {
        const purposeText: string = await purpose.innerText();
        if (purposeText.includes("Visa extension")) {
            await purpose.click();
            break;
        }
    }

    await page.locator("#deliverymethod_1").click();
    await page.locator("#billname").fill("Test Company");
    await page.locator("#billing_phone").fill("3232");
    await page.locator("#billing_email").fill("test@etst.com");
    await page.locator("#billing_address_1").fill("11 Falls Avenue ");
    await page.locator("#billing_city").fill("Craigiburn");
    await page.locator("#select2-billing_state-container").click();

    const allStates: Locator[] = await page.locator("#select2-billing_state-results li").all();
    for (let state of allStates) {
        const stateText: string = await state.innerText();
        if (stateText.includes("Punjab")) {
            await state.click();
            break;
        }
    }

    await page.locator("#billing_postcode").fill("121212");
    const orderTotal: string = await page.locator("tr[class='order-total'] td").innerText();
    expect(orderTotal).toEqual(expectedPrice);
    await page.waitForTimeout(2000);
})