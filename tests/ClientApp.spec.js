const { test,  expect} = require('@playwright/test');
//const {expect} = require ('@playwright/test');


test('First Playwright with browser context declaration', async ({  browser}) => {

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

test.only('Cient App Login', async ({  page}) => {

  // get title and assert 
  const email = "mzamo.mahaeng@gmail.com";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");
  let url = "https://rahulshettyacademy.com/client";
  await page.goto(url);
  console.log(await page.title());
  await page.locator("#userEmail").fill(email);
  await page.locator('#userPassword').fill("Mzamo123")
  await page.locator('#login').click();
  //  console.log(await page.locator(".card-body b").first().textContent());

  // ask playwright to complete all the api calls to load on the page 
  await page.pause();
  await page.waitForLoadState('networkidle');
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