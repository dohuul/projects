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
	console.log("enterwq")
	var isElementFound = waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout);
	if(isElementFound){
		webdriverClient.findElement(searchLocatorObj).click();		
	}
	else{
		throw "Can't perform click because can not find element";
	}
}

browserUtility.sendKeysWebElement = function(webdriverClient, searchLocatorObj, text){
	var isElementFound = waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout);
	if(isElementFound){
		webdriverClient.findElement(searchLocatorObj).sendKeys(text);		
	}
	else{
		throw "Can't perform send keys because can not find element";
	}
}

module.exports.browserUtility = browserUtility;