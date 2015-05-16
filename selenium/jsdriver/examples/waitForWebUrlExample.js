console.log("Enter Test");

var webDriverModule = require('selenium-webdriver');
var webDriverFactoryModule = require('../utility/webdriverFactory.js');
var browserUtilityModule = require('../utility/browserUtility.js')

var browserName = "chrome";
var webDriverFactory = webDriverFactoryModule.webdriverFactory;
var browserUtility = browserUtilityModule.browserUtility;

var webdriver = webDriverFactory.createWebdriverClientFor(browserName);

var getUrlPromise = webdriver.get('https://fraudguard.interthinx.com');

getUrlPromise.then(function(){

	browserUtility.waitForWebElement(webdriver, {id:'ctl00_ContentPlaceHolder1_UsernameTextBox'}).then(function(idBoxElement){
		
			browserUtility.openUrlInNewTab(webdriver,'https://google.com', 'google').then(function(isOpenSucess){
				console.log("isOpenSuccess " + isOpenSucess);

				var waitForBrowserTitlePromise = browserUtility.waitForWebPartialUrl(webdriver, "interthinx").then(function(isFound){
						console.log(isFound);
				});
				
			});
	});	

},
function(error){
	//callback error implementation
	console.log("getFraudGuardUrlPromise failed");
});


