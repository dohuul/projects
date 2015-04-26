/*
 *	This file is intended to add handling for waiting and search elements
 */

//Reference required namespace 
var webdriverModule = require('selenium-webdriver');
var until = webdriverModule.until;
var by = webdriverModule.by;
var defaultTimeout = 5000;

var browserUtility = {};

browserUtility.waitForWebElement = function(webdriverClient, seleniumSearchLocatorObj){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		console.log("Log: Entering waitForWebElement -- elemtent: " + seleniumSearchLocatorObj[Object.keys(seleniumSearchLocatorObj)[0]]);
		webdriverClient.wait(until.elementLocated(seleniumSearchLocatorObj), defaultTimeout).then(function(webElement){					
					console.log("Log: Exiting waitForWebElement --- element: " + seleniumSearchLocatorObj[Object.keys(seleniumSearchLocatorObj)[0]]);
					resolve(webElement);
					
		});
	});
}

/*
* call resolve call back
*/
browserUtility.waitForWebTitle = function(webdriverClient, title, timeout){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
		var isDone = 0;
		var foundWindowId = "none";
		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){
					webdriverClient.getTitle().then(function(pageTitle){					
						
						if(pageTitle.indexOf(title) !== -1){
							 foundWindowId = handleId;	
						}

						if(++isDone == handles.length){
							if(foundWindowId !== "none"){
								webdriverClient.switchTo().window(handles[foundWindowId]).then(function(){
									resolveFunc(webdriverClient);
								});
							}
							else{
								rejectFunc("Exception in waitForWebTitle --- could not find window with title of " + title);
							}

						}

					});
				});
			}
		})
	});
}

browserUtility.waitForWebTitleV2 = function(webdriverClient, title, timeout){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
		console.log("Log: Entering waitForWebTitle --- looking for the title of " + title);
		var isDone = 0;
		var foundWindowId = "none";
		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){

					webdriverClient.getTitle().then(function(pageTitle){
						
						//save a reference to windowId if we found it
						if(pageTitle.indexOf(title) !== -1){								 					
							 foundWindowId = handleId;																			 
						}
						//this is where we reach the end of the loop
						if(++isDone == handles.length){
							//switch to the window if there is any match
							if(foundWindowId != "none"){
									console.log("Log: Exiting waitForWebTitle --- webTitle is found ---  window index is " + foundWindowId);									
									webdriverClient.switchTo().window(handles[foundWindowId]).then(function(){
										resolveFunc(true);
									});
							}
							else{
								console.log("Log: Exiting waitForWebTitle --- webTitle of " + title + " is not found")
								resolveFunc(false);
							}

						} // end of if isDone					
					    		 						
					}); // end of getTitle promise
				}); // end of switchTo promise
			} // end of for loop
		}); // end of getAllWindowHandle promise
	}); // end of promise constructor
}

// As it closes the window, the caller is responsible for switching to its working window. if it does not do so, no window found exception will be raised.
browserUtility.closeWindowByTitle = function(webdriverClient, title){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
		console.log("Log: Entering closeWindowByTitle -- trying to close " + title);
		browserUtility.waitForWebTitleV2(webdriverClient, title, defaultTimeout).then(function(isWebTitleFound){
			if(isWebTitleFound){
				webdriverClient.close().then(function(){
					console.log("Log: Exiting closeWindowByTitle -- window is successfully closed")
					resolveFunc(true);
				});
			}
			else{
				console.log("Exiting closeWindowByTitle -- could not find a window with title of " + title);
				resolveFunc(false);
			}
		});		
	});
}


browserUtility.clickWebElement = function(webdriverClient, searchLocatorObj){
	 console.log("Log: Entering clickWebElement " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
	 browserUtility.waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout).then(function(webElement){
	 	console.log("Log: Exiting clickWebElement " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
	 	webElement.click();	 	
	 },function(error){
	 	console.log("log: error clickWebElement " + error)
	 });	
}

browserUtility.sendKeysWebElement = function(webdriverClient, searchLocatorObj, text){
	 console.log("Log: Entering sendKeysWebElement --- elemnent: " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
	 browserUtility.waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout).then(function(webElement){
	 	console.log("Log: Exiting sendKeysWebElement --- element: " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
	 	webElement.sendKeys(text);	 	
	 },function(error){

	 	console.log("Log: error sendKeysWebElement " + error);
	 });	
}

browserUtility.getRadioButtonByIndex = function(webdriverClient, searchLocatorObj, index){
	return new webdriverModule.promise.Promise(function(resovle, reject){
		console.log("Log: Entering getRadioButtonByIndex --- element:  " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
		webdriverClient.findElements(searchLocatorObj).then(function(elements){
			if(index >= elements.length){
				reject("getRadioButtonByIndex error --- index is out of range");
			}
			else{				
				console.log("Log: Exiting getRadioButtonByIndex --- element: " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
				resovle(elements[index]);		
			}
		});
	});
}

browserUtility.clickRadioButtonByIndex = function(webdriverClient, searchLocatorObj, index){
	return new webdriverModule.promise.Promise(function(resovle, reject){
		console.log("Log: Entering clickRadioButtonByIndex --- element: " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
		browserUtility.getRadioButtonByIndex(webdriverClient, searchLocatorObj, index).then(function(element){
			element.click().then(function(){
				console.log("Log: Exiting clickRadioButtonByIndex --- element: " + searchLocatorObj[Object.keys(searchLocatorObj)[0]]);
				resovle();
			})
		})
	});
}


browserUtility.clickComboboxOptionByIndex = function(webdriverClient, searchLocatorObjOfCombox, index){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		console.log("Log: Entering clickComboboxOptionByIndex --- element: " + searchLocatorObjOfCombox[Object.keys(searchLocatorObjOfCombox)[0]]);
		webdriverClient.findElement(searchLocatorObjOfCombox).then(function(element){
			element.findElements({tagName:'option'}).then(function(elements){
				elements[index].click().then(function(){
					console.log("Log: Exiting clickComboboxOptionByIndex --- element: " + searchLocatorObjOfCombox[Object.keys(searchLocatorObjOfCombox)[0]]);
					resolve();
				});				
			});			
		});
	})
}

browserUtility.openNewTab = function(){


}

browserUtility.openUrlInNewTab = function(){


}



module.exports.browserUtility = browserUtility;