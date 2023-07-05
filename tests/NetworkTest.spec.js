const {test , expect, request} = require('@playwright/test');
//const {APIUtils} = require('./utils/APIUtils');
import APIUtils from './utils/APIUtils';

// The before all we intergrate API to inject token cookie into browser and no need to login
const loginPayLoad =   {userEmail:"mzamo.mahaeng@gmail.com",userPassword:"Mzamo123"};
const orderPayload = {orders:[{country:"South Africa",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
const fakePayloadOrders = {data:[],message:"No Orders"};  // this is a javascrip object so key has no  double quotes
// this is javascript object so remove the quotes in the key 
// let  orderId;
// let token;
let response;
test.beforeAll(async()=>
{


    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    // to debug. place a breakpoint on the line of code
    // press Ctrl+Shift P then select Debug:Debut npm scrpt
    //this can be done only after chanding the package.json
    // "scripts": {
   // "test":"npx playwright test tests/WebAPIPart1.spec.js --headed"

  //},
    response =  await apiUtils.createOrder(orderPayload);
 
});

// test.beforeEach( () =>
// {


// });

test('Place the order', async ({  page}) => {

  // get title and assert 
//   const aPiUtils = new APiUtils(apiContext,loginPayLoad);
//  const orderId = new APiUtils(orderPayload);
 

//   let url = "https://rahulshettyacademy.com/client";
//   await page.goto(url);
//   console.log(await page.title());
//   await page.locator("#userEmail").fill(email);
//   await page.locator('#userPassword').fill("Mzamo123")
//   await page.locator('#login').click();
//   //  console.log(await page.locator(".card-body b").first().textContent());

//   // ask playwright to complete all the api calls to load on the page 

//   await page.waitForLoadState('networkidle');

// to inject the token we need to execute javascript expressions in playwright 
// again this is an anynymous function ( no names)
page.addInitScript(value =>
    {

            window.localStorage.setItem('token', value); // javascript code to insert cookie. this takes a key value pair
    } , response.token);

const email = "mzamo.mahaeng@gmail.com";
const productName = "zara coat 3";
  let url = "https://rahulshettyacademy.com/client";
await page.goto(url);
//Section 9: Session storage & intercepting network requests /  responses in Playwrght
//video  43 : this is where we intercept the response from the server as after the end point is called 
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/642b3533568c3e9fb146d390",
async route=> //asynchronous function so we give the => arrow function
{
    //we are intercepting the response as the API gives it >> gives it to  [ so we intercept the repose here and playwright does it here]browser >> then render the data

     const response =  await page.request.fetch(route.request());  // here wer turning the page fiture to api mode hence the response is used as imported above
    let body =  JSON.stringify(fakePayloadOrders); 
     route.fulfill(
        {
            response,
            body,

        }

    ); // this is were it sends the response to browser but we will mock or fake it

}




);



// const products = page.locator(".card-body");
// await page.pause();
// await page.waitFor(".card-body b");
//   console.log(await page.locator(".card-body b").allTextContents());

//   const count = await products.count()
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

//   await page.pause();

//   await page.locator("[routerlink*='cart']").click();
//   await page.locator("div li").first().waitFor(); // will wait for all these elements to show on the page
//   const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
//   expect(bool).toBeTruthy();
//   await page.locator("text=Checkout").click();
//   await page.locator("[placeholder*='Country']").type("ind", {delay: 100}); // delay type by 100 miliseconds
//   const dropdown = page.locator(".ta-results");
//   await dropdown.waitFor();
//   const optionsCount = await dropdown.locator("button").count(); // wea re chainning the locator from the class down to the button. so it class and space then button
//   for (let i = 0; i < optionsCount; ++i) {

//     const text  = await dropdown.locator("button").nth(i).textContent(); // this should return 3. iterate 
//         if(text === " India")
//         {
//             // click that options 
//             await dropdown.locator("button").nth(i).click()
//             break;
//         }

//   }

//   await page.pause();

//  //await expect(page.locator("//input[@class='input txt text-validated ng-pristine ng-valid ng-touched']")).toHaveText(email);
// await page.locator(".btnn.action__submit.ng-star-inserted").click();
// await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
// const orderId  = await page.locator("label[class='ng-star-inserted']").textContent();
// //    css  for line 102 .em-spacer-1 .ng-star-inserted

// console.log("This is the order id : ", orderId );

//click on orders button 
await page.pause();
 await page.locator("//button[@routerlink='/dashboard/myorders']").click(); // just want to see if xpath really works
//  or css  .btn.btn-custom[routerlink='/dashboard/myorders']
//   button[routerlink*='/dashboard/myorders']

//await page.locator("tbody").waitFor() // we have to wait for all the table to load this ist o solve synchronization issues
await page.pause();
const verifyOrders = await page.locator(".mt-4").textContent();
console.log(verifyOrders);


// From the your order page 
// tbody highlights all the rows
// get the entire rows in the table 

//await page.pause();
// const rows = await page.locator("tbody tr");
// for(let i=0;i< await rows.count();++i)
// {

//   const rowOrderId = await  rows.nth(i).locator("th").textContent(); // chainning locators to only look at the order id numbers 
//         if(response.orderId.includes(rowOrderId))
//         {

//           //now we click on view 
//           await  rows.nth(i).locator("button").first().click(); // onlt the first 
//           break;
//         }
// }

// await page.pause();
// const orderIdDetails = await page.locator(".col-text").allTextContents();
// await page.pause();
// expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

// so the test case is to verify if the order shows up on the histoty
// precondition - create order

// payload 
///    https://rahulshettyacademy.com/api/ecom/order/create-order
//    {"orders":[{"country":"South Africa","productOrderedId":"6262e95ae26b7e1a10e89bf0"}]}




  //    button[type='button']

  // select ZARA COAT 3

  //   https://rahulshettyacademy.com/client
  // password Mzamo123
  //  mzamo.mahaeng@gmail.com

  //second account 
  // tamia.tamara@gmail.com
  // Password123




});
