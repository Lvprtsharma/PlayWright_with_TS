import { test, expect, Locator } from "@playwright/test"

test("Verify Pagination and read data of all pages", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasMorePages: Boolean = true;

    while (hasMorePages) {

        const rows = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());
        }

        // button[aria-label='Next']
        // button[aria-controls='example']:has-text('›')
        // button[aria-controls='example']:nth-child(9)

        const nextButton: Locator = page.locator("button[aria-label='Next']");
        const isDisabled: string | null = await nextButton.getAttribute("class");

        if (isDisabled?.includes("disabled")) {
            hasMorePages = false;
        }
        else {
            await nextButton.click();
        }
    }

})


test("Filter the rows and check the rows count", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown: Locator = page.locator("#dt-length-0")
    await dropdown.selectOption({ value: '25' });

    // Approach 1
    const rowsArray: Locator[] = await page.locator("#example tbody tr").all();
    expect(rowsArray.length).toBe(25);

    // Approach 1
    const rows: Locator = await page.locator("#example tbody tr");
    await expect(rows).toHaveCount(25);

})

test("Search for specific data in the table", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const search: Locator = page.locator("#dt-search-0")
    await search.fill("Shou Itou")

    // Approach 1
    const rowsArray: Locator[] = await page.locator("#example tbody tr").all();
    if (rowsArray.length > 1) {
        let matchFound: boolean = false;
        for (let row of rowsArray) {
            const text: string = await row.innerText();
            if (text.includes("Shou Itou")) {
                console.log("Record found!!!")
                matchFound = true;
                break;
            }
            expect(matchFound).toBeTruthy();
        }
    }
    else {
        console.log("No rows found with seacrh text")
    }
})

test("Select multiple checkboxes in table", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const productTable: Locator = page.locator("#productTable");
    await expect(productTable).toBeVisible();

    const pageNumbersLocators: Locator[] = await page.locator("#pagination li").all();
    console.log(pageNumbersLocators);

    const pageCounts: number = pageNumbersLocators.length;
    console.log("Total number of pages: ", pageCounts);

    const rows: Locator = page.locator("#productTable tbody tr")
    const rowsCounts: number = await rows.count()
    console.log("Number of Rows: ", rowsCounts)
    console.log("Rows: ", rows)

    for (let pages of pageNumbersLocators) {
        await pages.click();
        for (let i = 0; i < rowsCounts; i++) {
            let cellData: Locator = rows.nth(i).locator('td');
            let cellCount: number = await cellData.count();
            for (let j = 0; j < cellCount; j++) {
                if (j !== 3) {
                    let cellText = await cellData.nth(j).innerText();
                    console.log(cellText);
                }
                else {
                    let checkbox: Locator = cellData.nth(j).locator("input");
                    await checkbox.check();
                }
            }
            await page.waitForTimeout(200);
        }
    }
})