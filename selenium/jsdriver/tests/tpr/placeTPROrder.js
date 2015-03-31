var webdriverFactoryModule = require('../../utility/webdriverFactory.js');
var webdriverModule = require('selenium-webdriver');
var assert = require('selenium-webdriver/testing/assert');

var Key = webdriverModule.Key;
var until = webdriverModule.until;
var by = webdriverModule.By;

var tprUser = "spyle";
var tprPass = "Lem1ller";
var tprSec = "ellen";

var companyName = "companyNameTest";
var NMLSID = "11111";
var companyStreetAdd = "8782 Lanark cir";
var cityStateZip = "Huntington Beach";
var state = "CA";
var zip = "92646";

var ssn11 = "666";
var ssn21 = "717";
var ssn31 = "046";

var ssn12 = "666";
var ssn22 = "611";
var ssn32 = "577";

var ssn13 = "666";
var ssn23 = "822";
var ssn33 = "261";

var ssn14 = "666";
var ssn24 = "585";
var ssn34 = "748";


var agent1FirstName = "Anabel";
var agent1LastName = "Farfan";
var streetAdd1 = "27484 Acacia Dr";
var cityStateZip1 = "Valencia";
var state1 = "CA";
var zip1= "91354";

var agent2FirstName = "Peggy";
var agent2LastName = "Swett";
var streetAdd2 = "1627 S Berendo St Apt 1629";
var cityStateZip2 = "Los Angeles";
var state2 = "CA";
var zip2 = "90006";

var agent3FirstName = "STEVEN";
var agent3LastName = "DURRANT";
var streetAdd3 = "2541 E Avenue J4";
var cityStateZip3 = "LANCASTER";
var state3 = "CA";
var zip3= "93636";

var agent4FirstName = "ROBERT";
var agent4LastName = "PRATT";
var streetAdd4 = "6091 Red Hill Ct";
var cityStateZip4 = "Fontana";
var state4 = "CA";
var zip4 = "92336";

var webdriverFactoryRef  = webdriverFactoryModule.webdriverFactory;

var webdriverClient = webdriverFactoryRef.createWebdriverClientFor("chrome");

webdriverClient.get("https://dev-logins.interthinx.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fwww.dev-fraudguard.com%2fSysdome2010%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fSysdome2010%252f&wct=2015-03-26T18%3a56%3a43Z");

var tprPageTitleExistPromise = webdriverClient.wait(until.titleContains("Sign"), 5000);

tprPageTitleExistPromise.then(function(pageTitleExist){
	console.log("Logging---tprPageTitleExistPromise fullfilled");	
	assert(pageTitleExist).equalTo(true);
},function(error){
	console.log("Logging---tprPageTitleExistPromise failed");
});


var waitForUserNameTextboxPromise = webdriverClient.wait(until.elementLocated({id:'ctl00_ContentPlaceHolder1_UsernameTextBox'}), 1000);

waitForUserNameTextboxPromise.then(function(webElement){
	console.log("Logging---waitForUserNameTextboxPromise fullfilled");	
	webElement.sendKeys(tprUser);

},function(error){

	console.log("Logging---waitForUserNameTextboxPromise failed");
});

var waitForUserNamePasswordPromise= webdriverClient.wait(until.elementLocated({id:'ctl00_ContentPlaceHolder1_PasswordTextBox'}), 1000);

waitForUserNamePasswordPromise.then(function(webElement){
	console.log("Logging---waitForUserNamePasswordPromise fullfilled");	
	webElement.sendKeys(tprPass);

},function(error){

	console.log("Logging---waitForUserNamePasswordPromise failed");
});


var waitForSubmitButtonPromise = webdriverClient.wait(until.elementLocated({id:'ctl00_ContentPlaceHolder1_SubmitButton'}), 1000);
	
	waitForSubmitButtonPromise.then(function(webElement){
		console.log("logging: waitForSubmitButtonPromise fullfilled")
		webElement.click();

	}, function(error){
		console.log("logging: waitForSubmitButtonPromise failed. " + error);
	})

var waitForSecretTextboxPromise = webdriverClient.wait(until.elementLocated({id:'ctl00_ContentPlaceHolder1_MFAtokenGenerator_txtSecurityQuestion'}), 1000);

waitForSecretTextboxPromise.then(function(webElement){
	console.log("Logging---waitForSecretTextboxPromise fullfilled");	
	webElement.sendKeys(tprSec);

},function(error){

	console.log("Logging---waitForSecretTextboxPromise failed");
});


var waitForSubmitSecButtonPromise = webdriverClient.wait(until.elementLocated({id:'ctl00_ContentPlaceHolder1_MFAtokenGenerator_btnContinue'}), 1000);
	
waitForSubmitSecButtonPromise.then(function(webElement){
		console.log("logging: waitForSubmitSecButtonPromise fullfilled")
		webElement.click();

}, function(error){
		console.log("logging: waitForSubmitSecButtonPromise failed. " + error);
})

var tprHomePageTitleExistPromise = webdriverClient.wait(until.titleContains("dev-fraudguard"), 5000);

tprHomePageTitleExistPromise.then(function(pageTitleExist){
	console.log("Logging---tprHomePageTitleExistPromise fullfilled");	
	assert(pageTitleExist).equalTo(true);
},function(error){
	console.log("Logging---tprHomePageTitleExistPromise failed");
});


var tprReviewLink = webdriverClient.findElement({linkText:'Third Party Review'});
tprReviewLink.click();

var waitForOrderReviewButtonPromise = webdriverClient.wait(until.elementLocated({id:'submit1'}), 1000);
	
waitForOrderReviewButtonPromise.then(function(webElement){
		console.log("logging: waitForOrderReviewButtonPromise fullfilled")
		webElement.click();

}, function(error){
		console.log("logging: waitForOrderReviewButtonPromise failed. " + error);
})


//Fillout TPR form
var waitForCompanyNameTextBoxPromise = webdriverClient.wait(until.elementLocated({name:'cmpcompanyname'}), 1000);

waitForCompanyNameTextBoxPromise.then(function(webElement){
	console.log("Logging---waitForCompanyNameTextBoxPromise fullfilled");	
	webElement.sendKeys(companyName);

},function(error){

	console.log("Logging---waitForCompanyNameTextBoxPromise failed");
});

webdriverClient.findElement({name:'nmlsid'}).sendKeys(NMLSID);
webdriverClient.findElement({name:'cmpaddress1'}).sendKeys(companyStreetAdd);
webdriverClient.findElement({name:'cmpcity'}).sendKeys(cityStateZip);
var combobox = webdriverClient.findElement({name:'cmpLicenseState1'})
combobox.click();
combobox.sendKeys(state);
combobox.sendKeys(Key.ENTER);

webdriverClient.findElement({name:'tprsubmit'}).click();


var waitForAgentTextBoxPromise = webdriverClient.wait(until.elementLocated({name:'own1fname'}), 1000);

waitForAgentTextBoxPromise.then(function(webElement){
	console.log("Logging---waitForAgentTextBoxPromise fullfilled");	
	webElement.sendKeys(agent1FirstName);

},function(error){

	console.log("Logging---waitForAgentTextBoxPromise failed");
});

webdriverClient.findElement({name:'own1lname'}).sendKeys(agent1LastName);
webdriverClient.findElement({name:'own1ssna'}).sendKeys(ssn11);
webdriverClient.findElement({name:'own1ssnb'}).sendKeys(ssn21);
webdriverClient.findElement({name:'own1ssnc'}).sendKeys(ssn31);
webdriverClient.findElement({name:'own1address1'}).sendKeys(streetAdd1);
webdriverClient.findElement({name:'own1city'}).sendKeys(cityStateZip1);
webdriverClient.findElement({name:'own1zipcode'}).sendKeys(zip1);
var combobox1 = webdriverClient.findElement({name:'own1state'})
combobox1.click();
combobox1.sendKeys(Key.DOWN);
combobox1.sendKeys(Key.DOWN);
combobox1.sendKeys(Key.DOWN);
combobox1.sendKeys(Key.DOWN);
combobox1.sendKeys(Key.DOWN);
combobox1.sendKeys(Key.DOWN);
combobox1.sendKeys(Key.ENTER);

webdriverClient.findElement({name:'own2fname'}).sendKeys(agent2FirstName);
webdriverClient.findElement({name:'own2lname'}).sendKeys(agent2LastName);
webdriverClient.findElement({name:'own2ssna'}).sendKeys(ssn12);
webdriverClient.findElement({name:'own2ssnb'}).sendKeys(ssn22);
webdriverClient.findElement({name:'own2ssnc'}).sendKeys(ssn32);
webdriverClient.findElement({name:'own2address1'}).sendKeys(streetAdd2);
webdriverClient.findElement({name:'own2city'}).sendKeys(cityStateZip2);
webdriverClient.findElement({name:'own2zipcode'}).sendKeys(zip1);
var combobox2 = webdriverClient.findElement({name:'own2state'})
combobox2.click();
combobox2.sendKeys(Key.DOWN);
combobox2.sendKeys(Key.DOWN);
combobox2.sendKeys(Key.DOWN);
combobox2.sendKeys(Key.DOWN);
combobox2.sendKeys(Key.DOWN);
combobox2.sendKeys(Key.DOWN);
combobox2.sendKeys(Key.ENTER);

webdriverClient.findElement({name:'own3fname'}).sendKeys(agent3FirstName);
webdriverClient.findElement({name:'own3lname'}).sendKeys(agent3LastName);
webdriverClient.findElement({name:'own3ssna'}).sendKeys(ssn13);
webdriverClient.findElement({name:'own3ssnb'}).sendKeys(ssn23);
webdriverClient.findElement({name:'own3ssnc'}).sendKeys(ssn33);
webdriverClient.findElement({name:'own3address1'}).sendKeys(streetAdd3);
webdriverClient.findElement({name:'own3city'}).sendKeys(cityStateZip3);
webdriverClient.findElement({name:'own3zipcode'}).sendKeys(zip3);
var combobox3 = webdriverClient.findElement({name:'own3state'})
combobox3.click();
combobox3.sendKeys(Key.DOWN);
combobox3.sendKeys(Key.DOWN);
combobox3.sendKeys(Key.DOWN);
combobox3.sendKeys(Key.DOWN);
combobox3.sendKeys(Key.DOWN);
combobox3.sendKeys(Key.DOWN);
combobox3.sendKeys(Key.ENTER);

webdriverClient.findElement({name:'own4fname'}).sendKeys(agent4FirstName);
webdriverClient.findElement({name:'own4lname'}).sendKeys(agent4LastName);
webdriverClient.findElement({name:'own4ssna'}).sendKeys(ssn14);
webdriverClient.findElement({name:'own4ssnb'}).sendKeys(ssn24);
webdriverClient.findElement({name:'own4ssnc'}).sendKeys(ssn34);
webdriverClient.findElement({name:'own4address1'}).sendKeys(streetAdd4);
webdriverClient.findElement({name:'own4city'}).sendKeys(cityStateZip4);
webdriverClient.findElement({name:'own4zipcode'}).sendKeys(zip4);
var combobox4 = webdriverClient.findElement({name:'own4state'})
combobox4.click();
combobox4.sendKeys(Key.DOWN);
combobox4.sendKeys(Key.DOWN);
combobox4.sendKeys(Key.DOWN);
combobox4.sendKeys(Key.DOWN);
combobox4.sendKeys(Key.DOWN);
combobox4.sendKeys(Key.DOWN);
combobox4.sendKeys(Key.ENTER);


webdriverClient.findElement({name:'submitOrder'}).click();

var tprFormElement = webdriverClient.wait(until.elementLocated({name:'tp_review_step1'}), 1000);
tprFormElement.then(function(element){
	var text = element.getText();
	text.then(function(textt){
		console.log(textt);

		var indexOfTPROrder = textt.indexOf("TPR#:");
		var TPROrderNumber = textt.substring(indexOfTPROrder, indexOfTPROrder+14);
		console.log(TPROrderNumber);

	})
	

})

webdriverClient.quit();


