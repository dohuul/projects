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
	
	//callback fullfilled implementation	
	console.log("getFraudGuardUrlPromise fullfilled");

	var waitForIdBoxPromise = browserUtility.waitForWebTitleV2(webdriver, {id:'ctl00_ContentPlaceHolder1_UsernameTextBox'}, 3000);

		waitForIdBoxPromise.then(function(idBoxElement){
			console.log("waitForIdBoxPromise fullfilled");

			var waitForBrowserTitlePromise = browserUtility.waitForWebTitleV2(webdriver, "Sign", 5000);

			waitForBrowserTitlePromise.then(function(isFound){
				console.log("waitForBrowserTitlePromise fullfilled");
				console.log("isFound: " + isFound);

					browserUtility.closeWindowByTitle(webdriver, "Sign");

			},function(error){
				console.log("waitForBrowserTitlePromise failed.");
				console.log("error is "  + error);
			});


	},function(error){
		console.log("waitForIdBoxPromise failed");
		console.log("waitForIdBoxPromise error is" + error);

	});

},
function(error){
	//callback error implementation
	console.log("getFraudGuardUrlPromise failed");
});


