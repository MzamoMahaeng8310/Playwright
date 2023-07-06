class DashBoardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cardButton = page.locator("[routerlink*='cart']");

    }

    async seachAndPopulateCard(productName) {

       // await page.waitForLoadState('networkidle');
        //await page.waitFor(".card-body b");
       // await pag.waitFot(this.productsText);
       await this.page.pause();
         const title =  await this.productsText.allTextContents(); // DASHBOARD POM
        console.log(title);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            console.log(await this.products.nth(i).locator("b").textContent());
            if (await this.products.nth(i).locator("b").textContent() == productName) {

                // add to cart 
                await this.products.nth(i).locator("text= Add To Cart").click(); // chainning locator
                // await page.locator("body > app-root:nth-child(1) > app-dashboard:nth-child(2) > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(4)").click();
                break;

            }

        }
    }

    async navigateToCart()
    {

        await this.cardButton.click();
    }



}

export default DashBoardPage
// import syntax  import DashBoardPage from '../folder/class' 