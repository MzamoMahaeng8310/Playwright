const {test,expect} = require ('@playwright/test')

test("Popup Validations", async ({page}) =>
{

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        // await page.goto("https://google.com");
        // await page.goBack();
        // await page.goForward();
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        // Section 7 : handling web dialogs, frane & event listeners in playwright 
        // this is a web or java popup. you cant spy any elements 
        await page.pause();
        page.on('dialog',dialog => dialog.accept());   // this will let you listen for events // this will click on ok or accept
        //page.on('dialog',dialog => dialog.dismiss()); // this wil dismiss or cancel 
        await page.locator("#confirmbtn").click(); // ti does not even have to be in sequence due to listener
       await page.locator("#mousehover").hover();
    // interacting with iframes 
    const framesPage = page.frameLocator("#courses-iframe")   // switch to the iframe
    await framesPage.locator("li a[href*='ifetime-access']:visible").click()  // the other element is invisible mode . so 2 elements now. 1 is hidden.
    // so only click on the visible element. 
    // so we get the css with .(dot) CLASS  ( parent) space TAG e.g. .text h2
    const textCheck = await framesPage.locator(".text h2").textContent();  // we only need number only  subscribers 
    const numbersOnly = textCheck.split(" ")[1]; // so brek up the string in spaces. so 4 spaces and index 0 1 2 3 
    // return an array and give me back the first index aka the numbers 
    console.log(numbersOnly);

})

test("Screenshot & Visual Comparison", async ({page}) =>
{ 
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'element screenshot.png'}); //screenshot of an element 
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'}) // screenshot of the page
    await expect(page.locator("#displayed-text")).toBeHidden();
    
})

test.only("Visual Regression Testing", async ({page})=>
{

//await page.goto("https://flightaware.com/");
await page.goto("https://www.google.com/");
expect(await page.screenshot()).toMatchSnapshot('Landingpage.png');


})