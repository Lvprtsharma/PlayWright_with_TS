import {test, expect, Locator} from "@playwright/test"

test("Verify Chrome CPU Load in Dynamic Web Table", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const taskTable:Locator = page.locator("table[id='taskTable']");
    await expect(taskTable).toBeVisible();

    const headerRow:Locator = taskTable.locator("thead tr");
    const dataRows:Locator = taskTable.locator("tbody tr");

    console.log(`Header Rows : ${await headerRow.count()}`);
    console.log(`Data Rows : ${await dataRows.count()}`);

    const dataRowsLocators:Locator[] = await dataRows.all();
    let tableCPULoad:string = ''

    for(let row of dataRowsLocators){
        const nameCellData:string = await row.locator('td').nth(0).innerText();
        if (nameCellData.toLowerCase() == "chrome"){
            // const cpuLoadData:string = await (row.locator('td:has-text("%")')).innerText(); // This is a CSS syntax
            tableCPULoad = await (row.locator('td',{hasText:/%/})).innerText(); // This is a PW syntax
            console.log(tableCPULoad);
            break;
        }
    }

    const cpuLoadText:string = await (page.getByText("CPU load of Chrome process: ")).innerText();
    const cpuLoadTextOnly:string = cpuLoadText.split(':')[1].trim();
    console.log(cpuLoadTextOnly);
    expect(cpuLoadTextOnly).toEqual(tableCPULoad);

})

test("Verify FireFox Memory Size in Dynamic Web Table", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const taskTable:Locator = page.locator("table[id='taskTable']");
    await expect(taskTable).toBeVisible();

    const headerRow:Locator = taskTable.locator("thead tr");
    const dataRows:Locator = taskTable.locator("tbody tr");

    console.log(`Header Rows : ${await headerRow.count()}`);
    console.log(`Data Rows : ${await dataRows.count()}`);

    const dataRowsLocators:Locator[] = await dataRows.all();
    let tableMemory:string = ''

    for(let row of dataRowsLocators){
        const nameCellData:string = await row.locator('td').nth(0).innerText();
        if (nameCellData.toLowerCase() == "firefox"){
            // const cpuLoadData:string = await (row.locator('td:has-text("%")')).innerText(); // This is a CSS syntax
            tableMemory = await (row.locator('td',{hasText: /MB$/ })).innerText(); // This is a PW syntax
            console.log(tableMemory);
            break;
        }
    }

    const memorySize:string = await (page.getByText("Memory Size of Firefox process: ")).innerText();
    const memorySizeText:string = memorySize.split(':')[1].trim();
    console.log(memorySizeText);
    expect(memorySizeText).toEqual(tableMemory);

})