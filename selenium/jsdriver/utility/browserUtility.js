/*
 *	This file is intended to add handling for waiting and search elements
 */

//Reference required namespace 
var webdriverModule = require('selenium-webdriver');
var until = webdriverModule.until;
var by = webdriverModule.by;
var defaultTimeout = 3000;

var browserUtility = {
	'waitForWebElement' : function(webdriverClient, seleniumSearchLocatorObj, timeout){
		return new webdriverModule.promise.Promise(function(resolve,reject){

			webdriverClient.wait(until.elementLocated(seleniumSearchLocatorObj), timeout).then(function(webElement){
				resolve(webElement);

			},function(error){
				reject(error);
			});

		})



			
			var elementFound = false;
			var waitPromise = webdriverClient.wait(until.elementLocated(seleniumSearchLocatorObj), timeout);
			waitPromise.then(function(webElement){
				elementFound = true;
			}, function(error){
				elementFound = false;
			});
			return elementFound;
	}
}


browserUtility.waitForWebTitle = function(webdriverClient, title, timeout){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){

		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){

					webdriverClient.getTitle().then(function(pageTitle){
						if(pageTitle.indexOf(title) !== -1)
							return resolveFunc(webdriverClient);						
					});

				});

			}

		})

	});
}



browserUtility.clickWebElement = function(webdriverClient, searchLocatorObj){
	 console.log("log: enter clickWebElement " + searchLocatorObj);
	 browserUtility.waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout).then(function(webElement){
	 	webElement.click();

	 	console.log("log: exit clickWebElement " + searchLocatorObj);
	 },function(error){

	 	console.log("log: error clickWebElement " + error)
	 });	
}

browserUtility.sendKeysWebElement = function(webdriverClient, searchLocatorObj, text){
	 console.log("log: enter sendKeysWebElement " + searchLocatorObj);
	 browserUtility.waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout).then(function(webElement){
	 	webElement.sendKeys(text);

	 	console.log("log: exit sendKeysWebElement " + searchLocatorObj);
	 },function(error){

	 	console.log("log: error sendKeysWebElement " + error);
	 });	
}

module.exports.browserUtility = browserUtility;