// Login once => then playwright can store the
//entire application data and store in JSON and insert into the browser 
//this is for complex settings on the browser. 
//this is called storagestate
const { test,  expect} = require('@playwright/test');
let webContext;


test.beforeAll( async({browser})=>
{


    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "mzamo.mahaeng@gmail.com";
    let url = "https://rahulshettyacademy.com/client";
    await page.goto(url);
    console.log(await page.title());
    await page.locator("#userEmail").fill(email);
    await page.locator('#userPassword').type("Mzamo123");
    await page.locator('#login').click();
    //  console.log(await page.locator(".card-body b").first().textContent());
      // ask playwright to complete all the api calls to load on the page 
    await page.pause();
    await page.waitForLoadState('networkidle');

    //after loggin in. yo have to give this in context level not page. Browser session 
    // you have cookies at a browser level not a tab level
    await  context.storageState({path:'stage.json'}); // this will store all the appliation settings
    // a state.json file was created. 
    // now invoke a browser by injecting the state.JSON file 
    webContext = await browser.newContext({storageState:'stage.json'})

});
test('Cient App Login', async () => {

    // get title and assert 
   // const email = "mzamo.mahaeng@gmail.com";
    const productName = "zara coat 3";
    //this is where we inject after loggin in
    const page = await webContext.newPage(); // callthe injected page here
    const  url = "https://rahulshettyacademy.com/client";
    await page.goto(url);

    // injected the login after the before all storage

    //also the page is created dynamically so we no longer need the fixture
    const products = page.locator(".card-body");
 
    // let url = "https://rahulshettyacademy.com/client";
    // await page.goto(url);
    // console.log(await page.title());
    // await page.locator("#userEmail").fill(email);
    // await page.locator('#userPassword').fill("Mzamo123")
    // await page.locator('#login').click();
    // //  console.log(await page.locator(".card-body b").first().textContent());
  
    // // ask playwright to complete all the api calls to load on the page 
    // await page.pause();
    // await page.waitForLoadState('networkidle');
  //await page.waitFor(".card-body b");
    console.log(await page.locator(".card-body b").allTextContents());
  
    const count = await products.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
      console.log(await products.nth(i).locator("b").textContent());
      if (await products.nth(i).locator("b").textContent() == productName) {
  
        // add to cart 
        await products.nth(i).locator("text= Add To Cart").click(); // chainning locator
        // await page.locator("body > app-root:nth-child(1) > app-dashboard:nth-child(2) > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(4)").click();
        break;
  
      }
  
    }
  
    await page.pause();
  
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); // will wait for all these elements to show on the page
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind", {delay: 100}); // delay type by 100 miliseconds
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count(); // wea re chainning the locator from the class down to the button. so it class and space then button
    for (let i = 0; i < optionsCount; ++i) {
  
      const text  = await dropdown.locator("button").nth(i).textContent(); // this should return 3. iterate 
          if(text === " India")
          {
              // click that options 
              await dropdown.locator("button").nth(i).click()
              break;
          }
  
    }
  
    await page.pause();
  
   //await expect(page.locator("//input[@class='input txt text-validated ng-pristine ng-valid ng-touched']")).toHaveText(email);
  await page.locator(".btnn.action__submit.ng-star-inserted").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId  = await page.locator("label[class='ng-star-inserted']").textContent();
  //    css  for line 102 .em-spacer-1 .ng-star-inserted
  
  console.log("This is the order id : ", orderId );
  
  //click on orders button 
   await page.locator("//button[@routerlink='/dashboard/myorders']").click(); // just want to see if xpath really works
  //  or css  .btn.btn-custom[routerlink='/dashboard/myorders']
  //   button[routerlink*='/dashboard/myorders']
  
  await page.locator("tbody").waitFor() // we have to wait for all the table to load this ist o solve synchronization
  
  // From the your order page 
  // tbody highlights all the rows
  // get the entire rows in the table 
  
  await page.pause();
  const rows = await page.locator("tbody tr");
  for(let i=0;i< await rows.count();++i)
  {
  
    const rowOrderId = await  rows.nth(i).locator("th").textContent(); // chainning locators to only look at the order id numbers 
          if(orderId.includes(rowOrderId))
          {
  
            //now we click on view 
            await  rows.nth(i).locator("button").first().click(); // onlt the first 
            break;
          }
  }
  
  await page.pause();
  const orderIdDetails = await page.locator(".col-text").allTextContents();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
  
    //    button[type='button']
  
    // select ZARA COAT 3
  
    //   https://rahulshettyacademy.com/client
    // password Mzamo123
    //  mzamo.mahaeng@gmail.com
  
  
  
  });


  
  test('Test Case 2 Login', async () => {

    // get title and assert 
   // const email = "mzamo.mahaeng@gmail.com";
    const productName = "zara coat 3";
    //this is where we inject after loggin in
    const page = await webContext.newPage(); // callthe injected page here
    const  url = "https://rahulshettyacademy.com/client";
    await page.goto(url);

    // injected the login after the before all storage

    //also the page is created dynamically so we no longer need the fixture
    const products = page.locator(".card-body");
 
    // let url = "https://rahulshettyacademy.com/client";
    // await page.goto(url);
    // console.log(await page.title());
    // await page.locator("#userEmail").fill(email);
    // await page.locator('#userPassword').fill("Mzamo123")
    // await page.locator('#login').click();
    // //  console.log(await page.locator(".card-body b").first().textContent());
  
    // // ask playwright to complete all the api calls to load on the page 
    // await page.pause();
    // await page.waitForLoadState('networkidle');
  //await page.waitFor(".card-body b");
    console.log(await page.locator(".card-body b").allTextContents());
  });

