import { test, expect, Locator } from "@playwright/test"

test("End to End Scenario on BlazeDemo", async ({ page }) => {

    let allFairs: number[] = [];

    await page.goto("https://blazedemo.com/");

    const header: Locator = page.getByText(/Welcome\s+to\s+the\s+Simple\s+Travel\s+Agency!/);
    await expect(header).toBeVisible();

    const fromPort: Locator = page.locator("select[name='fromPort']");
    await fromPort.selectOption({ value: "Mexico City" });

    const toPort: Locator = page.locator("select[name='toPort']");
    await toPort.selectOption({ value: "Dublin" });

    const findFlightsButton: Locator = page.locator("input[value='Find Flights']");
    await findFlightsButton.click();

    const flightsHeader: Locator = page.getByText("Mexico City to Dublin");
    await expect(flightsHeader).toBeVisible();

    const flightsTable: Locator = page.locator(".table tbody");
    await expect(flightsTable).toBeVisible();

    const flightsTableRows: Locator[] = await flightsTable.locator("tr").all();

    for (let row of flightsTableRows) {
        let flightFare: string = await (row.locator('td').nth(5)).innerText();
        let parsedFare: number = parseFloat(flightFare.trim().split("$")[1]);
        allFairs.push(parsedFare);
    }

    const lowestFair: number = (allFairs.sort((a, b) => a - b))[0];
    console.log("Lowest Fair: ", lowestFair);
    await page.waitForTimeout(1000);

    for (let row of flightsTableRows) {
        const farDetails: string = await (row.locator('td').nth(5)).innerText();
        console.log(farDetails)
        if (farDetails.includes(String(lowestFair))) {
            const chooseFlightButton: Locator = row.locator('td input[value="Choose This Flight"]');
            await chooseFlightButton.click();
            break;
        }
    }
    await expect(page.getByText(/Your\s+flight\s+from\s+TLV\s+to\s+SFO\s+has\s+been\s+reserved./i)).toBeVisible();
})
