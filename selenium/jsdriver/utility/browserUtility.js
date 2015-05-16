/*
 *	This file is intended to add handling for waiting and search elements
 */

//Reference required namespace 
var loggingModule = require('./loggingUtility.js');
var webdriverModule = require('selenium-webdriver');

//global instance declaration
var loggerUtility = loggingModule.loggerUtility;
var until = webdriverModule.until;
var by = webdriverModule.By;
var defaultTimeout = 12000;
var isLoggingEnabled = false;


var browserUtility = {};

browserUtility.getObjectValue = function (myObject, keyIndex){
	return myObject[Object.keys(myObject)[keyIndex]];
}

browserUtility.waitForWebElement = function(webdriverClient, seleniumSearchLocatorObj){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		loggerUtility.log("Log: Entering waitForWebElement -- element: " + browserUtility.getObjectValue(seleniumSearchLocatorObj, 0));
		webdriverClient.wait(until.elementLocated(seleniumSearchLocatorObj), defaultTimeout).then(function(webElement){					
					loggerUtility.log("Log: Exiting waitForWebElement --- element: " + browserUtility.getObjectValue(seleniumSearchLocatorObj, 0));
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
		loggerUtility.log("Log: Entering waitForWebTitle --- looking for the title of " + title);
		var retryInterval = 1000;
		var retryCount = defaultTimeout / retryInterval;

		//setInterval is used to wait for window existence
		var intervalId = setInterval(function(){
			var isDone = 0;
			var foundWindowId = "none";
			var actualWindowId = 0;
			webdriverClient.getAllWindowHandles().then(function(handles){
							
				for(var handleId in handles){

					webdriverClient.switchTo().window(handles[handleId]).then(function(){
					
						webdriverClient.getTitle().then(function(pageTitle){
							
							//save a reference to windowId if we found it
							if(pageTitle.indexOf(title) !== -1){								 					
								 foundWindowId = actualWindowId;
								 clearInterval(intervalId);																			 
							}
							//this is where we reach the end of the loop
							if(++isDone == handles.length){
								//switch to the window if there is any match
								if(foundWindowId != "none"){
										loggerUtility.log("Log: Exiting waitForWebTitle --- webTitle is found ---  window index is " + foundWindowId);									
										webdriverClient.switchTo().window(handles[foundWindowId]).then(function(){
											resolveFunc(true);
										});
								}
								else{
									loggerUtility.log("Log: Exiting waitForWebTitle --- webTitle of " + title + " is not found")
									resolveFunc(false);
								}								
							} // end of if isDone			

							if(retryCount-- == 0){
								clearInterval(intervalId);
							}		

						    actualWindowId++; 
						    //we need a variable in the outer scope to hold the value of window id because in node js,
						    //the local function only gets the final value of its parent variable
						    //by the time the call back is invoked, the handleId variable of for loop already reaches its final value
						    		 						
						}); // end of getTitle promise
					}); // end of switchTo promise
				} // end of for loop
			}); // end of getAllWindowHandle promise

		}, retryInterval);
		
	}); // end of promise constructor
}

browserUtility.waitForWebTitleV3 = function(webdriverClient, title, timeout){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
		loggerUtility.log("Log: Entering waitForWebTitle --- looking for the title of " + title);
		webdriverClient.getAllWindowHandles().then(function(handles){
		 	browserUtility.waitForWebTitleRecursively(webdriverClient,handles,title, 0).then(function(isFound){

		 		console.log(isFound);
		 	});
		
		  
		});

	});

}

browserUtility.waitForWebTitleRecursively = function(webdriverClient, windowHandles, partialTitle, currentIndex){
  	if(currentIndex == windowHandles.length){
  		return  new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
  			 resolveFunc(false);
  		});
    }
    else{
    	webdriverClient.switchTo().window(windowHandles[currentIndex]).then(function(){

    		webdriverClient.getTitle().then(function(title){
    			if(title.indexOf(partialTitle) !== -1 ){
    				console.log("true");
    				return  new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
  			 			resolveFunc(true);
  					});
    			}
    			else{
    				return browserUtility.waitForWebTitleRecursively(webdriverClient,windowHandles,partialTitle,currentIndex+1);
    			}

    		});
    	});
    }

}

/* To avoid confusion, the function will only call resolver when all active windows are checked against partialURL
* 
*/
browserUtility.waitForWebPartialUrl = function(webdriverClient, partialUrl){
	loggerUtility.log("Log: Enter waitForWebPartialUrl --- waiting for " + partialUrl);
	return new webdriverModule.promise.Promise(function(resolve, reject){
		//get all active windows
		var waitingCountdown = defaultTimeout / 2000;
		var intervalId = setInterval(function(){
			webdriverClient.getAllWindowHandles().then(function(windows){
			console.log("enter getAllWindowHandles of waitForWebUrl");
			var currentWindowIndex = 0;
			var isWindowFound = false;

			var windowIndex = 1;
			for(var i=0; i < windows.length; i++){
				//The i has the correct value
				webdriverClient.switchTo().window(windows[i]).then(function(){

					//if we use i in the callback, i will have a final value
					console.log("enter switchTo of waitForWebUrl -- switching to window " + windowIndex);
					webdriverClient.getCurrentUrl().then(function(url){
					  
					    console.log("enter getCurrnetUrl of waitForWebUrl");
						if(url.indexOf(partialUrl) !== -1){			
						    
						    loggerUtility.log("Log: Enter waitForWebPartial --- found web with url of " + partialUrl + " on window " + windowIndex );				
							
							isWindowFound = true;						
						}					

						if(++currentWindowIndex == windows.length){
							
							loggerUtility.log("Log: Enter waitForWebPartialUrl --- did we find web with url of " + partialUrl + " --- " + isWindowFound);
							//if the waiting is done or we found the window call resolver
							
							if(waitingCountdown-- == 0
								|| isWindowFound  == true){
								
								//loggerUtility.log("Log: Enter waitForWebPartialUrl --- did we find web with url of " + partialUrl + " --- " + isWindowFound);
							    resolve(isWindowFound);
								
								clearInterval(intervalId);
							}	
						}				
						windowIndex++;
					}); // end of getCurrentUrl
					
				}); // end of switchTo
			}// end of for loop
			}); // end of getAllWindowHandles

		},3000); // end of setInterval		
	}); // end of promise's contructor call
}

// As it closes the window, the caller is responsible for switching to its working window. if it does not do so, no window found exception will be raised.
browserUtility.closeWindowByTitle = function(webdriverClient, title){
	return new webdriverModule.promise.Promise(function(resolveFunc, rejectFunc){
		loggerUtility.log("Log: Entering closeWindowByTitle -- trying to close " + title);
		browserUtility.waitForWebTitleV2(webdriverClient, title, defaultTimeout).then(function(isWebTitleFound){
			if(isWebTitleFound){
				webdriverClient.close().then(function(){
					loggerUtility.log("Log: Exiting closeWindowByTitle -- window is successfully closed")
					resolveFunc(true);
				});
			}
			else{
				loggerUtility.log("Exiting closeWindowByTitle -- could not find a window with title of " + title);
				resolveFunc(false);
			}
		}); // end of waitForWebTitleV2 promsie		
	}); // end promise
}


browserUtility.clickWebElement = function(webdriverClient, searchLocatorObj){
	 loggerUtility.log("Log: Entering clickWebElement " + browserUtility.getObjectValue(searchLocatorObj, 0));
	 browserUtility.waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout).then(function(webElement){
	 	loggerUtility.log("Log: Exiting clickWebElement " + browserUtility.getObjectValue(searchLocatorObj, 0));
	 	webElement.click();	 	
	 },function(error){
	 	loggerUtility.log("log: error clickWebElement " + error)
	 });	
}

browserUtility.sendKeysWebElement = function(webdriverClient, searchLocatorObj, text){
	 loggerUtility.log("Log: Entering sendKeysWebElement --- elemnent: " + browserUtility.getObjectValue(searchLocatorObj, 0));
	 browserUtility.waitForWebElement(webdriverClient, searchLocatorObj, defaultTimeout).then(function(webElement){
	 	loggerUtility.log("Log: Exiting sendKeysWebElement --- element: " + browserUtility.getObjectValue(searchLocatorObj, 0));
	 	webElement.sendKeys(text);	 	
	 },function(error){
	 	loggerUtility.log("Log: error sendKeysWebElement " + error);
	 });	
}

browserUtility.getRadioButtonByIndex = function(webdriverClient, searchLocatorObj, index){
	return new webdriverModule.promise.Promise(function(resovle, reject){
		loggerUtility.log("Log: Entering getRadioButtonByIndex --- element:  " + browserUtility.getObjectValue(searchLocatorObj, 0));
		webdriverClient.findElements(searchLocatorObj).then(function(elements){
			if(index >= elements.length){
				reject("getRadioButtonByIndex error --- the radio buttons are found but the input index is larger than total buttons. Please check your input index");
			}
			else{				
				loggerUtility.log("Log: Exiting getRadioButtonByIndex --- element: " + browserUtility.getObjectValue(searchLocatorObj, 0));
				resovle(elements[index]);		
			} // end else
		}); // end of findElements searchLocatorObj promise
	}); // end of promise
}

browserUtility.clickRadioButtonByIndex = function(webdriverClient, searchLocatorObj, index){
	return new webdriverModule.promise.Promise(function(resovle, reject){
		loggerUtility.log("Log: Entering clickRadioButtonByIndex --- element: " + browserUtility.getObjectValue(searchLocatorObj, 0));
		browserUtility.getRadioButtonByIndex(webdriverClient, searchLocatorObj, index).then(function(element){
			element.click().then(function(){
				loggerUtility.log("Log: Exiting clickRadioButtonByIndex --- element: " + browserUtility.getObjectValue(searchLocatorObj, 0));
				resovle();
			}); // end of click promise
		}); // end of getRadioButtonByIndex promise
	}); // end of promise
}


browserUtility.clickComboboxOptionByIndex = function(webdriverClient, searchLocatorObjOfCombox, index){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		loggerUtility.log("Log: Entering clickComboboxOptionByIndex --- element: " + browserUtility.getObjectValue(searchLocatorObjOfCombox, 0));
		webdriverClient.findElement(searchLocatorObjOfCombox).then(function(element){
			element.findElements({tagName:'option'}).then(function(elements){
				if(index > elements.length - 1){
					throw "clickComboboxOptionByIndex error --- the combo box is found but the input index is larger than total options. Please check your input index";
				}
				else{
					elements[index].click().then(function(){
					loggerUtility.log("Log: Exiting clickComboboxOptionByIndex --- element: " + browserUtility.getObjectValue(searchLocatorObjOfCombox, 0));
					resolve();
					});	// end elements click promise
				} // end else
							
			}); // end findElemnts option promise
		}); // end of findElements searchLocatorObjOfCombox promise
	}); // end of promise
}

/* open url in new tab
 * change webdriver focus to the new tab
 */
browserUtility.openUrlInNewTab = function(webdriverClient, url, partialUrl){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		loggerUtility.log("Log: Entering openUrlInNewTab");
		webdriverClient.executeScript("window.open(arguments[0],'_blank');", url).then(function(){
				loggerUtility.log("Log: Entering openUrlInNewTab executeScript -- openUrlInNewTab success");
				browserUtility.waitForWebPartialUrl(webdriverClient,partialUrl).then(function(isOpenSucess){
					console.log("Log: Entering waitForWebPartialUrl of openUrlInNewTab " + isOpenSucess);
					resolve(isOpenSucess);
			});
			
		});
	});
}



module.exports.browserUtility = browserUtility;