const {
  test,
  expect
} = require('@playwright/test');
const {
  customtest
} = require('../utils/test-base'); //import the fixture
//const {expect} = require ('@playwright/test');
//import LoginPage from './pageobjects'
//const {LoginPage} = require ('../pageobjects/LoginPage'); // THIS NONSENSE DOES NOT WORK!!!
//****** This is managed by  PO Manager class */
//import LoginPage from '../pageobjects/LoginPage'; // THIS IS THE ONLY WAY TO IMPORT THE CLASS
//import DashBoardPage from '../pageobjects/DashBoardPage';
//****** this is managed by PO manager class */

import MyCartPage from '../pageobjects/MyCartPage';
import PaymentPage from '../pageobjects/PaymentPage';
//import OrderConfirmationPage from '../pageobjects/OrderConfirmationPage';
//import OrdersListPage from '../pageobjects/OrdersListPage';
import POManager from '../pageobjects/POManager';

//This is where we import the dataset file 
// The best way to handle this is to createa JSON  >> convert to string >> then javascript oject
const dataset = JSON.parse(JSON.stringify(require("../utils/placeholderTestData.json")));

test.skip('First Playwright with browser context declaration', async ({
  browser
}) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  console.log(await page.title());
  // selectors are 
  //css , xpath 
  await userName.type("Mzamo Money Flow");
  await page.locator("[type='password']").type("learning");
  // #signInBtn
  await signIn.click();
  //extract text
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
  // type and fill 
  await userName.fill("")
  await userName.fill("rahulshettyacademy")
  await signIn.click();

  // access the first element of the 4
  console.log(await cardTitle.nth(1).textContent());
  console.log(await cardTitle.first().textContent());

  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});
for (const data of dataset) {
  test.skip(`Cient App Login Page Object Model Design for ${data.productName}`, async ({
    page
  }) => {

    // get title and assert 
    const pageObjectManager = new POManager(page);

    // *** this data is no longer needed as a dataset is not created
    // const username = "mzamo.mahaeng@gmail.com";
    // const password = "Mzamo123";
    // const productName = "zara coat 3";



    //const loginPage = new LoginPage(page);  //*This is now wrapped in the Page object manager 
    const loginPage = pageObjectManager.getLoginPage();
    // let url = "https://rahulshettyacademy.com/client";
    // await page.goto(url);
    // console.log(await page.title());
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password)

    //dashboard 
    //const dashBoardPage = new DashBoardPage(page); //*This is now wrapped in the Page object manager 
    const dashBoardPage = pageObjectManager.getDashboardPage();
    await dashBoardPage.seachAndPopulateCard(data.productName);
    await dashBoardPage.navigateToCart();
    // await page.locator("#userEmail").fill(email);
    // await page.locator('#userPassword').fill("Mzamo123")
    // await page.locator('#login').click();
    //  console.log(await page.locator(".card-body b").first().textContent());

    // DASHBORAD PAGE
    //const products = page.locator(".card-body");  // DASHBOARD POM
    // ask playwright to complete all the api calls to load on the page 
    await page.pause();
    //   await page.waitForLoadState('networkidle');
    // //await page.waitFor(".card-body b");
    //   console.log(await page.locator(".card-body b").allTextContents()); // DASHBOARD POM

    //   const count = await products.count();
    //   console.log(count);
    //   for (let i = 0; i < count; ++i) {
    //     console.log(await products.nth(i).locator("b").textContent());
    //     if (await products.nth(i).locator("b").textContent() == productName) {

    //       // add to cart 
    //       await products.nth(i).locator("text= Add To Cart").click(); // chainning locator
    //       // await page.locator("body > app-root:nth-child(1) > app-dashboard:nth-child(2) > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(4)").click();
    //       break;

    //     }

    //   }

    // await page.pause();

    // await page.locator("[routerlink*='cart']").click();
    //=============================================================================
    //my card page : POM 
    const myCartPage = new MyCartPage(page);
    await myCartPage.validateAndCheckoutOrder();
    // await page.locator("div li").first().waitFor(); // will wait for all these elements to show on the page *constructor*
    // const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // *contructor* maybe  use  const productName = "zara coat 3";
    // expect(bool).toBeTruthy();
    // await page.locator("text=Checkout").click(); //*constructor* 

    // ================================================================================

    // Payment Page : POM

    let countryIndicator = "ind";
    let selectCountryList = " India";
    const paymentPage = new PaymentPage(page);
    await paymentPage.populateAndPlaceOrder(countryIndicator, selectCountryList);
    await paymentPage.placeTheOrder();
    //   await page.locator("[placeholder*='Country']").type("ind", {
    //     delay: 100    // *contructor*

    //   }); // delay type by 100 miliseconds
    //   const dropdown = page.locator(".ta-results");
    //   await dropdown.waitFor();  // *contructor*
    //   const optionsCount = await dropdown.locator("button").count(); // wea re chainning the locator from the class down to the button. so it class and space then button
    //  // *contructor*
    //   for (let i = 0; i < optionsCount; ++i) {

    //     const text = await dropdown.locator("button").nth(i).textContent(); // this should return 3. iterate 
    //     if (text === " India") {  //paramitize this
    //       // click that options 
    //       await dropdown.locator("button").nth(i).click()
    //       break;
    //     }

    //   }

    //   //await page.pause();

    //   //await expect(page.locator("//input[@class='input txt text-validated ng-pristine ng-valid ng-touched']")).toHaveText(email);
    //   await page.locator(".btnn.action__submit.ng-star-inserted").click();  //*constructor 

    //=======================================================================

    // Thank you for the order page : POM 
    // ===============================================================
    // const confirmMessage = " Thankyou for the order. ";
    // const orderConfirmation = new OrderConfirmationPage(page);
    // await orderConfirmation.verifyOrder(confirmMessage);
    // await orderConfirmation.navigateToOrders();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // above contructor and paramitize the comfirmation message 
    const orderId = await page.locator("label[class='ng-star-inserted']").textContent();
    //    css  for line 102 .em-spacer-1 .ng-star-inserted
    //*contructor*

    console.log("This is the order id : ", orderId);

    //click on orders button 
    await page.locator("//button[@routerlink='/dashboard/myorders']").click(); // just want to see if xpath really works
    //  or css  .btn.btn-custom[routerlink='/dashboard/myorders']
    //   button[routerlink*='/dashboard/myorders']

    //*contructor*

    //=================================================================================

    // Orders Page : POM
    //==================================================================================


    // const orderListPage = new OrdersListPage(page);
    //orderListPage.FindAndVerifyOrder();
    await page.locator("tbody").waitFor() // we have to wait for all the table to load this ist o solve synchronization
    // *contructor*

    // From the your order page 
    // tbody highlights all the rows
    // get the entire rows in the table 

    await page.pause();
    const rows = await page.locator("tbody tr");
    // *contructor*
    for (let i = 0; i < await rows.count(); ++i) {

      const rowOrderId = await rows.nth(i).locator("th").textContent(); // chainning locators to only look at the order id numbers 
      if (orderId.includes(rowOrderId)) {

        //now we click on view 
        await rows.nth(i).locator("button").first().click(); // onlt the first 
        break;
      }
    }

    await page.pause();
    const orderIdDetails = await page.locator(".col-text").allTextContents();
    // // *contructor*
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    //==========================================================================





    //    button[type='button']

    // select ZARA COAT 3

    //   https://rahulshettyacademy.com/client
    // password Mzamo123
    //  mzamo.mahaeng@gmail.com




  });

}


  // section 11 vodep 54 fixtures
  customtest.only(`Cient App Login Fixtures`, async ({page,testDataForOrder}) => 
  {

    // get title and assert 
    const pageObjectManager = new POManager(page);

    // *** this data is no longer needed as a dataset is not created
    // const username = "mzamo.mahaeng@gmail.com";
    // const password = "Mzamo123";
    // const productName = "zara coat 3";



    //const loginPage = new LoginPage(page);  //*This is now wrapped in the Page object manager 
    const loginPage = pageObjectManager.getLoginPage();
    // let url = "https://rahulshettyacademy.com/client";
    // await page.goto(url);
    // console.log(await page.title());
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password) // this is used as a javascript object

    //dashboard 
    //const dashBoardPage = new DashBoardPage(page); //*This is now wrapped in the Page object manager 
    const dashBoardPage = pageObjectManager.getDashboardPage();
    await dashBoardPage.seachAndPopulateCard(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
    // await page.locator("#userEmail").fill(email);
    // await page.locator('#userPassword').fill("Mzamo123")
    // await page.locator('#login').click();
    //  console.log(await page.locator(".card-body b").first().textContent());

    // DASHBORAD PAGE
    //const products = page.locator(".card-body");  // DASHBOARD POM
    // ask playwright to complete all the api calls to load on the page 
    await page.pause();
    //   await page.waitForLoadState('networkidle');
    // //await page.waitFor(".card-body b");
    //   console.log(await page.locator(".card-body b").allTextContents()); // DASHBOARD POM

    //   const count = await products.count();
    //   console.log(count);
    //   for (let i = 0; i < count; ++i) {
    //     console.log(await products.nth(i).locator("b").textContent());
    //     if (await products.nth(i).locator("b").textContent() == productName) {

    //       // add to cart 
    //       await products.nth(i).locator("text= Add To Cart").click(); // chainning locator
    //       // await page.locator("body > app-root:nth-child(1) > app-dashboard:nth-child(2) > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(4)").click();
    //       break;

    //     }

    //   }

    // await page.pause();

    // await page.locator("[routerlink*='cart']").click();
    //=============================================================================
    //my card page : POM 
    const myCartPage = new MyCartPage(page);
    await myCartPage.validateAndCheckoutOrder();
    // await page.locator("div li").first().waitFor(); // will wait for all these elements to show on the page *constructor*
    // const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // *contructor* maybe  use  const productName = "zara coat 3";
    // expect(bool).toBeTruthy();
    // await page.locator("text=Checkout").click(); //*constructor* 

    // ================================================================================
  });












/*
Locators in Playwright 
CSS is recommnded by playwight 

e.g 
<input type="text" name="username" id="username" class="form-control" xpath="1">
if id is present 
css -> tagname#id  (or) #id 
e.g. input#username or  #username

if class attribute is present 
css -> tagname.class (or)  .class ( make sure there is no space)
e.g. .form-control  
input.form-control

Parent tagname {space} child {tagname}

Write css based  on any attribute 
css ->[attribute='value']  e.g. [name='username']
or css =>   tagname[attribute='value']
Write Css with traversing from patent to child
css -> parenttagname >> childtagname

e.g. .card-body a"

 if needs to write the locator basd on text 
 text = ''

 for css we can also use regular expression

 e.g. <div class="alert alert-danger col-md-12" style="display: none;" css="1"></div>

 [style*='none']
*/