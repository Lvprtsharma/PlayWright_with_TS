import {test, expect, Locator} from "@playwright/test"

test("Verify Static Web Table", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Check table visibility
    const bookTable:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(bookTable).toBeVisible();

    // Check number of rows in the table
    const rows:Locator = bookTable.locator("tr"); // Chaining of locators -- returns all rows including the header
    await expect(rows).toHaveCount(7);

    const bookTableRowsCount:number = await rows.count();
    console.log(`Number fo rows in book table: ${bookTableRowsCount}`);
    expect(bookTableRowsCount).toBe(7);

    // Check number of headers/columns in table
    const columns:Locator = rows.locator("th");
    await expect(columns).toHaveCount(4);

    const columnsCount:number = await columns.count();
    console.log(`Number fo columns in book table: ${columnsCount}`);
    expect(columnsCount).toBe(4);

    // Read all the data from any specific row
    const secondRowCells:Locator = rows.nth(2).locator('td');
    console.log(`Second row cells: ${secondRowCells}`);

    const secondRowText: string[] = await secondRowCells.allInnerTexts();
    console.log(`Second row data: ${secondRowText}`);
    console.log("Second row data: ",secondRowText);
    await expect(secondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);
    
    // Read all data from the table (excluding header)
    console.log("======= All rows data =======\n")
    const allRowsData: Locator[] = await rows.all();

    console.log("BookName	Author	Subject	Price");
    for(let rows of allRowsData.slice(1)){  // skip header row as it doesn't have td cell
        const data:string[] = await rows.locator("td").allInnerTexts();
        console.log(data.join('\t'))
        // console.log(await rows.allTextContents())
    }

    // Print all booknames where the author is Amit
    console.log("\n======= Books written by Amit =======")
    let bookCount:number = 0;
    for(let rows of allRowsData.slice(1)){  // skip header row as it doesn't have td cell
        const cells:string[] = await rows.locator("td").allInnerTexts();
        const author:string = cells[1];
        const book:string = cells[0];
        if (author.toLowerCase() === "amit"){
            console.log(`${author} -- ${book}`);
            bookCount += 1;
        }
    }
    console.log(`Total number of books written by Amit - ${bookCount}`);
    expect(bookCount).toBe(2);

    // Calculate the total price of all books
    console.log("\n======= Total price of all books =======")
    let totalPrice:number = 0;
    for(let rows of allRowsData.slice(1)){  // skip header row as it doesn't have td cell
        const cells:string[] = await rows.locator("td").allInnerTexts();
        const price:string = cells[3];
        totalPrice = totalPrice + parseFloat(price);
    }
    console.log(`Total price of all books - ${totalPrice}`);
    expect(totalPrice).toBe(7100);

})