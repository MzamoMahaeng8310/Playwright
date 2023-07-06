class LoginPage {

constructor(page)
{
    //create all yor element locators in the constructor so that 
    //everyone has access to the class variables
    this.page = page;
    this.signInButton = page.locator('#login');
    this.userName = page.locator("#userEmail");
    this.password = page.locator('#userPassword');

}

async goTo()
{
  await this.page.goto("https://rahulshettyacademy.com/client");

}
async validLogin(username,password)
{
  await this.userName.fill(username);
  await this.password.fill(password)
  await this.signInButton.click();
  await this.page.waitForLoadState('networkidle');
  await this.page.pause();


}




}

//export default LoginPage
export default LoginPage  // THIS IS THE ONLY WAY TO EXPORT

