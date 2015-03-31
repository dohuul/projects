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

//search all windoes for title
//if there more than two windows, return the first one
browserUtility.waitForWebTitle = function(webdriverClient, title, timeout){
		var titleFound = false;
		var getHandlesPromise = webdriverClient.getAllWindowHandles();

		getHandlesPromise.then(function(handles){
			console.log("log: getHandlesPromise in Utility fullfilled -- page title is " + title);
		
			for (var handle in handles){

				webdriverClient.switchTo().window(handles[handle]).then(function(){
					console.log("log: switchToHandlePromise fullfilled -- page title is " + title);

					var waitForPageTitlePromise = webdriverClient.wait(until.titleContains(title), timeout);
					waitForPageTitlePromise.then(function(doesPageTitleExist){
						console.log("log: waitForPageTitlePromise fullfilled -- page title is " + title );						
						return doesPageTitleExist;
						
					},function(error){

						console.log("log: waitForPageTitlePromise failed -- page title is " + title);
					});	

				},function(error){					
					console.log("log: switchToHandlePromise failed -- page title is " + title + " error: " + error);
				});

				//return the first found title
				if(titleFound)
					break;
			}

		},function(error){
			console.log("logging: getHandlesPromise in Utility failed" );
		})
		console.log("titleFound is " + titleFound)
		return getHandlesPromise;
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