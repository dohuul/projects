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

			console.log("Enter waitForWebElement -- Waiting on " + seleniumSearchLocatorObj[Object.keys(seleniumSearchLocatorObj)[0]]);
			
			webdriverClient.wait(until.elementLocated(seleniumSearchLocatorObj), timeout).then(function(webElement){
					resolve(webElement);

				},function(error){
					reject(error);
			});

		});
	}
}


browserUtility.waitForWebTitle = function(webdriverClient, title, timeout){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){

		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){

					webdriverClient.getTitle().then(function(pageTitle){
					
						if(pageTitle.indexOf(title) !== -1)
							 resolveFunc(webdriverClient);						
					});
				});
			}
		})
	});
}


/*
browserUtility.waitForWebTitle = function(webdriverClient, title, timeout){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
		console.log("entering waitForWebTitle --- looking for the title of " + title);
		var isDone = 0;
		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){

					webdriverClient.getTitle().then(function(pageTitle){
						console.log(pageTitle);

						//call resolve with true as soon as we find it
						if(pageTitle.indexOf(title) !== -1){
							 console.log("exiting waitForWebTitle -- webTitle is found");
							 resolveFunc(true);							 
						}
						else{
							//only call resolve with false if we are at the last window
					    	if(++isDone == handles.length){
					    	 console.log("exiting waitForWebTitle --- webTitle is not found")
					    	 resolveFunc(false);
					    	}
						}

						
					    		 						
					});
				});
			}
		})
	});
}
*/

function IsWindowTitleFound(webdriverClient, windows, currentWindowIndex, title){
	if(currentWindowIndex == windows.length)
		return false;
	else{

	}

}



browserUtility.printAllWindowsTitle = function(webdriverClient){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){

		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){

					webdriverClient.getTitle().then(function(pageTitle){
						console.log(pageTitle);	

							resolveFunc();						
					});
				});
			}
		})
	});

}

browserUtility.closeWindowByTitle = function(webdriverClient, title){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){

		webdriverClient.getAllWindowHandles().then(function(handles){
			for(var handleId in handles){
				webdriverClient.switchTo().window(handles[handleId]).then(function(){

					webdriverClient.getTitle().then(function(pageTitle){
						console.log(pageTitle);
						if(pageTitle.indexOf(title) !== -1){							
								 resolveFunc();wh													 
							
						}
							 						
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

browserUtility.getRadioButtonByIndex = function(webdriverClient, searchLocatorObj, index){
	return new webdriverModule.promise.Promise(function(resovle, reject){
		webdriverClient.findElements(searchLocatorObj).then(function(elements){
			if(index >= elements.length){
				reject("index is out of range1123");
			}
			else{				
				resovle(elements[index]);		
			}
		});
	});
}

browserUtility.clickRadioButtonByIndex = function(webdriverClient, searchLocatorObj, index){
	return new webdriverModule.promise.Promise(function(resovle, reject){
		browserUtility.getRadioButtonByIndex(webdriverClient, searchLocatorObj, index).then(function(element){
			element.click().then(function(){
				resovle();
			})
		})
	});
}


browserUtility.clickComboboxOptionByIndex = function(webdriverClient, searchLocatorObjOfCombox, index){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		webdriverClient.findElement(searchLocatorObjOfCombox).then(function(element){
			element.findElements({tagName:'option'}).then(function(elements){
				elements[index].click().then(function(){
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