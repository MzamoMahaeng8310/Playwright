const {
   test,
   expect,
   request
} = require('@playwright/test');
//const {expect} = require ('@playwright/test');


test.only('First Playwright with browser context declaration', async ({
   browser
}) => {

   const context = await browser.newContext();
   const page = await context.newPage();

   // video 44 Section : 9 : how to abort network calls in playwright 
  // page.route('**/*.css',route=> route.abort());     // block anywhith with CSS extention with regular expression 
  // page.route('**/*.css',route=> route.abort());   // you can also block images in the website
  // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
   
   const userName = page.locator('#username');
   const signIn = page.locator("#signInBtn");
   const cardTitle = page.locator(".card-body a");

   // playwright can record all the calls in the network tab 
   page.on('request',request=> console.log(request.url()));// listen for this request call event to occur
   // you can look at all the calls and ou can see the 200 ad error codes like 400 or 500
    page.on('response',response=> console.log(response.url(),response.status())); // this is all the status codes
   
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
  // await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
   // type and fill 
   await userName.fill("");
   await userName.fill("rahulshettyacademy");

   //this is used when the site does not have network api calls
   //await Promise.all(
  //    [
         //page.waitForNavigation(),
        // page.frame.waitForNavigation(),
   //      page.frame.waitForURL(),
         //   This method is inherently racy, please use frame.waitForURL() instead.
         //page.waitForRequest(),

         signIn.click();
  //    ]

   //)


   // access the first element of the 4
   //    console.log(await cardTitle.nth(1).textContent());
   //    console.log(await cardTitle.first().textContent());

   // non services oriented or network calls

   await page.pause();
   const allTitles = await cardTitle.allTextContents();
   console.log(allTitles);
});

test.skip('First Playwright Test With Page Fixture Only', async ({
   page
}) => {

   let url = "https://google.com";
   await page.goto(url)
   // get title and assert 
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");





});

test('UI Controls', async ({page}) => {

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const signIn = page.locator("#signInBtn");
   const dropDown = page.locator('select.form-control');
   const documentLink = page.locator("'[href*='documents-request']");
   const chkTerms = page.locator("#terms");
   //dropdowns
   await dropDown.selectOption("consult"); // pass in the vallue attribute value="consult"
   //await page.pause(); // this will open playwight inspector

   //radio buttons 
   await page.locator(".checkmark").last().click();
   await page.locator('#okayBtn').click(); //this is just a web pages locator not JAVA and click will wait
   // assert if the radiobuttoon is selected
   console.log(await page.locator(".checkmark").last().isChecked())
   expect(page.locator(".checkmark").last()).toBeChecked();
   await chkTerms.click();
   await expect(chkTerms).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class","blinkingText");

   //await page.pause(); // this will open playwight inspector


});


test.skip('Section 4: Handling Child window', async ({browser}) => 
{
   const context = await browser.newContext();
   const page = await context.newPage();
  
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");
  // const userName = page.locator('#username');
   // this is to avoid the racing aka asynchonious nature of javascript
   //this will open a new page(tab) and create the context
   // the the new page is returned as an array incase multiple pages are openned
  const [newpage] = await Promise.all  
  ([
   context.waitForEvent('page'), // this is saying that a separate page tab will open
   documentLink.click(),

  ])
//this is another way to navigate different pages
// const page1Promise = page.waitForEvent('popup'); //// nagivate the the next page 
// documentLink.click()
//   const newpage = await page1Promise; // nagivate the the next page 

  //this is another way to navigate different pages
  //now we are working with the new page context it was stored in line 111
   const text =  await newpage.locator(".red").textContent();
   const arrayText = text.split("@") // so this slips left of the @ and right. so 0 array is left and 1 is right side
   const domain = arrayText[1].split(" ")[0] // right side of the slip 
  console.log(domain);
  await page.locator("#username").type(domain); // now we switch back to parent tab (page)
  //await page.pause()
  console.log("this is the parent page" + await page.locator("#username").textContent());
 

});



test.skip('Section 5 playwright codegen, record', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Free Access to InterviewQues/ResumeAssistance/Material' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Courses' }).click();
  await page1.goto('https://courses.rahulshettyacademy.com/courses');
  await page.getByLabel('Username:').click({
    button: 'right'
  });
  await page.getByLabel('Username:').fill('hulshetty.com');
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
css -> tagname.class (or)  .class
e.g. .form-control  
input.form-control

Write css based  on any attribute 
css ->[attribute='value']  e.g. [name='username']

Write Css with traversing from patent to child
css -> parenttagname >> childtagname

e.g. .card-body a"

 if needs to write the locator basd on text 
 text = ''

 for css we can also use regular expression

 e.g. <div class="alert alert-danger col-md-12" style="display: none;" css="1"></div>

 [style*='none']


 for traveciew 
 open https://trace.playwright.dev/
 and upload the .zip logs from the tests
*/