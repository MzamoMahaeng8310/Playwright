import LoginPage from '../pageobjects/LoginPage'; 
import DashBoardPage from '../pageobjects/DashBoardPage';
 

// This is the section for PO Manager Class. 
// instead of declaring so many instancees of the class just create a class to
//managed them all 

class POManager {
    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);


    }


getLoginPage()
{

    return  this.loginPage
}

getDashboardPage()
{

    return    this.dashBoardPage
}


}

export default POManager