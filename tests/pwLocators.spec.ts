/*
Locators - Identify the elements on the page.
DOM - Document Object Model.

HTML and DOM are not the same thing.
- DOM is a representation of the HTML document as a tree structure where each node is an object representing a part of the document.
    when the browser loads a web page, it creates the DOM for that page.
    DOM is an in-memory representation of the document that can be manipulated with programming languages like JavaScript.
    DOM is an API provided by the browser to interact with the HTML document.

- HTML is the markup language used to create the structure and content of web pages.

Locators are the central piece of Playwright's auto-waiting and retry-ability.
In a nutshell, locators represent a way to find element(s) on the page at any moment.

These are the recommended built-in locators.

1. Page.getByRole() to locate by explicit and implicit accessibility attributes.
2. Page.getByText() to locate by text content. (Non-interactive elements)
3. Page.getByLabel() to locate a form control by associated label's text.
4. Page.getByPlaceholder() to locate an input by placeholder.
5. Page.getByAltText() to locate an element, usually image, by its text alternative.
6. Page.getByTitle() to locate an element by its title attribute.
7. Page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

The above locators are recommended because they are more resilient to changes in the UI and more aligned with how users interact with the application.
These returns a Locator object that can be further refined or used to perform actions/assertions.

*/

import {test, expect, Locator} from "@playwright/test";

test("Verify Playwright build-in locators", async ({page}) => {

    await page.goto("https://demo.nopcommerce.com/");

    //1. page.getbyAltText() - identifies images (and similar elements) based on the alt attribute
    // use this locator when the element supports alt property such as "img" or "area" elements

    const logo:Locator = page.getByAltText("nopCommerce demo store");   // no await is needed here as Locator is a lazy object.

    // Await is only needed when some action is being performed or a promise is being returned.

    await expect(logo).toBeVisible();  // Await is needed here as toBeVisible() returns a promise.

    // 2. page.getByText() - find the element based on the text it contains. We can match substring, full string or refular expecression (regex).
    // Locate by visible text on the page.
    // Use this locator to find non-interactive elements such as div, span, p, etc.
    // For interactive elements such as buttons, links, a, inputs etc prefer using getByRole().
    // Text is not an attribute of an element, but the text content inside the element. While AltText is an attribute of an element.

    // const text:Locator = page.getByText("Welcome to our store");
    // await expect(text).toBeVisible();
    
    await expect(page.getByText("Welcome to our store")).toBeVisible();  // full string matching
    await expect(page.getByText("Welcome to")).toBeVisible();       // subs tring matching

    await expect(page.getByText(/Welcome\s+TO/i)).toBeVisible();       // Regular Experesion matching (case insensitive)


    /* 3. page.getByRole() - Locating by Role (Role is not an attribute but an accessibility property)
    - Role is an accessibility property that defines the purpose of an element on the page.
    - It helps assistive technologies (like screen readers) to understand the function of an element.
    - Example roles: button, link, checkbox, textbox, heading, etc.
    - Use this locator for interactive elements such as buttons, links, a, inputs etc.
    - Locators include buttons, checkboxes, links, lists, tables , and many more follows W3C accessibility standards and ARIA specifications.

    Implicit and Explicit Accessibility Attributes:
    - Implicit attributes are automatically assigned based on the HTML element type.
        For example, a <button> element has an implicit role of "button".
    - Explicit attributes are manually added to elements using ARIA (Accessible Rich Internet Applications) attributes.
        For example, adding role="button" to a <div> element to make it behave like a button.

    Example:
    - <button>Click Me</button>  // Implicit role of "button"
    - <div role="button" tabindex="0">Click Me</div>  // Explicit role of "button"

    Usage in Playwright:
    - page.getByRole('button', { name: 'Click Me' })  // Locates the button by its role and name.
    - This method is preferred for locating interactive elements as it aligns with how users interact with the application.
    - It also improves the resilience of tests against UI changes, as roles are less likely to change compared to other attributes like class or id.

    */
    // Using https://practicetestautomation.com/practice/ for this example.
    
    await page.goto("https://practicetestautomation.com/practice/")
    
    await page.getByRole("link", {name: "Test Login Page"}).click();
    await expect(page.getByRole("heading", {name: "Test login"})).toBeVisible();

    // 4. page.getByLabel() - Locate form controls by their associated label's text.
    // Use this locator to find input elements (input, select, textarea) associated with a label.
    // This is particularly useful for forms where inputs are labeled for accessibility.
    // Using https://practicetestautomation.com/practice/ for this example.

    await page.getByLabel(/Username/i).fill("student");
    await page.getByLabel(/Password/i).fill("Password123");

    // 5. page.getByPlaceholder() - Locate input elements by their placeholder text.
    // Use this locator to find input elements that have placeholder attributes.
    // Placeholder text is the text that appears inside an input field when it is empty, providing a hint to the user about what to enter.
    // Using https://demoqa.com/automation-practice-form for this example.

    await page.goto("https://demoqa.com/automation-practice-form");
    await page.getByPlaceholder("First Name").fill("john");

    // 6. page.getByTitle() - Locate elements by their title attribute.
    // Use this locator to find elements that have a title attribute.
    // The title attribute provides additional information about an element, often displayed as a tooltip when the user hovers over the element.
    // Using https://en.wikipedia.org/wiki/Main_Page/ for this example.
    
    // await page.goto("https://en.wikipedia.org/wiki/Main_Page");
    // const searchBoxByTitle:Locator = page.getByTitle("You're encouraged to log in; however, it's not mandatory. [ctrl-option-o]");
    // await expect(searchBoxByTitle).toBeVisible();

    // 7. page.getByTestId() - Locate elements by their data-testid attribute.
    // Use this locator to find elements that have a data-testid attribute.
    // This is particularly useful in testing scenarios where developers add data-testid attributes to elements specifically for testing purposes.
    // Using https://trello.com/ for this example.

    await page.goto("https://trello.com/");
    const searchBoxByTestId:Locator = page.getByTestId("ui-email-signup-input").first();
    await expect(searchBoxByTestId).toBeVisible();
    
    
})




