var browserUtilityModule = require("../../utility/browserUtility.js");
var webdriverModule = require('selenium-webdriver');
var Key = webdriverModule.Key;
var until = webdriverModule.until;
var by = webdriverModule.By;

var browserUtility = browserUtilityModule.browserUtility;

var intranetUrl = "https://dev-tools.sysdome.com/SysdomeIntranet/login.aspx";
var intranetUser = "spyle";
var intranetPass = "lemiller";
var tprUser = "spyle";
var tprPass = "Lem1ller";
var tprSec = "ellen";
var url1 = "https://dev-logins.interthinx.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fwww.dev-fraudguard.com%2fSysdome2010%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fSysdome2010%252f&wct=2015-03-26T18%3a56%3a43Z";


var tprUseCase = {};	

tprUseCase.fillOutAppraiserFirm = function(webdriverClient, appraiserFirmData){
		return new webdriverModule.promise.Promise(function(resolve, reject){
			webdriverClient.findElement({name:'own1fname'}).sendKeys(appraiserFirmData.fName);
			webdriverClient.findElement({name:'own1lname'}).sendKeys(appraiserFirmData.lName);
			webdriverClient.findElement({name:'own1mname'}).sendKeys(appraiserFirmData.mName);
			webdriverClient.findElement({name:'own1Address1'}).sendKeys(appraiserFirmData.address);
			webdriverClient.findElement({name:'own1city'}).sendKeys(appraiserFirmData.city);
			webdriverClient.findElement({name:'own1zipcode'}).sendKeys(appraiserFirmData.zip);

			webdriverClient.findElement({name:'cmpcompanyname'}).sendKeys(appraiserFirmData.name);
			
			webdriverClient.findElement({name:'own1ssna'}).sendKeys(appraiserFirmData.ssna);
			webdriverClient.findElement({name:'own1ssnb'}).sendKeys(appraiserFirmData.ssnb);
			webdriverClient.findElement({name:'own1ssnc'}).sendKeys(appraiserFirmData.ssnc);
			
			browserUtility.clickComboboxOptionByIndex(webdriverClient, {name:'own1state'}, 6).then(function(){
				webdriverClient.findElement({name:'tprsubmit'}).click().then(function(){

					
				})
				resolve(webdriverClient);
			});	

		});		
	}

tprUseCase.fillOutIndividualBroker = function(webdriverClient, brokerData){
		return new webdriverModule.promise.Promise(function(resolve, reject){
			webdriverClient.findElement({name:'own1fname'}).sendKeys(brokerData.fName);
			webdriverClient.findElement({name:'own1lname'}).sendKeys(brokerData.lName);
			webdriverClient.findElement({name:'own1Address1'}).sendKeys(brokerData.address);
			webdriverClient.findElement({name:'own1city'}).sendKeys(brokerData.city);
			webdriverClient.findElement({name:'own1zipcode'}).sendKeys(brokerData.zip);

			webdriverClient.findElement({name:'cmpaddress1'}).sendKeys(brokerData.address);
			webdriverClient.findElement({name:'cmpcity'}).sendKeys(brokerData.city);
			webdriverClient.findElement({name:'cmpzipcode'}).sendKeys(brokerData.zip);

		    webdriverClient.findElement({name:'own1ssna'}).sendKeys(brokerData.ssna);
		    webdriverClient.findElement({name:'own1ssnb'}).sendKeys(brokerData.ssnb);
		    webdriverClient.findElement({name:'own1ssnc'}).sendKeys(brokerData.ssnc);

		    webdriverClient.findElement({name:'own1mname'}).sendKeys(brokerData.mName);

		    browserUtility.clickComboboxOptionByIndex(webdriverClient, {name:'own1state'}, 6).then(function(){
					
			});

			browserUtility.clickComboboxOptionByIndex(webdriverClient, {name:'cmpstate'}, 6).then(function(){
				webdriverClient.findElement({name:'tprsubmit'}).click().then(function(){
					resolve(webdriverClient);
				})		
			});
			
		});		
	}

tprUseCase.fillOutCompanyInformation = function(webdriverClient, companyData){

		return new webdriverModule.promise.Promise(function(resolve, reject){
			webdriverClient.findElement({name:'cmpcompanyname'}).sendKeys(companyData.name);
			webdriverClient.findElement({name:'cmpaddress1'}).sendKeys(companyData.address);
			webdriverClient.findElement({name:'cmpcity'}).sendKeys(companyData.city);
			webdriverClient.findElement({name:'cmpzipcode'}).sendKeys(companyData.zip);
			browserUtility.clickComboboxOptionByIndex(webdriverClient, {name:'cmpstate'}, 6).then(function(){
				webdriverClient.findElement({name:'tprsubmit'}).click().then(function(){
					resolve(webdriverClient);
				})		
			});
		});
	}

tprUseCase.fillOutAgentOneInformation = function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own1fname",
			lName:"own1lname",
			mName: "own1mname",
			ssna: "own1ssna",
			ssnb: "own1ssnb",
			ssnc: "own1ssnc",
			strAdd: "own1address1",
			city: "own1city",
			state: "own1state",
			zip:"own1zipcode"
		}
		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	}

tprUseCase.fillOutAgentTwoInformation =  function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own2fname",
			lName:"own2lname",
			mName: "own2mname",
			ssna: "own2ssna",
			ssnb: "own2ssnb",
			ssnc: "own2ssnc",
			strAdd: "own2address1",
			city: "own2city",
			state: "own2state",
			zip:"own2zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	}

tprUseCase.fillOutAgentThreeInformation = function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own3fname",
			lName:"own3lname",
			mName: "own3mname",
			ssna: "own3ssna",
			ssnb: "own3ssnb",
			ssnc: "own3ssnc",
			strAdd: "own3address1",
			city: "own3city",
			state: "own3state",
			zip:"own3zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	}

tprUseCase.fillOutAgentFourInformation = function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own4fname",
			lName:"own4lname",
			mName: "own4mname",
			ssna: "own4ssna",
			ssnb: "own4ssnb",
			ssnc: "own4ssnc",
			strAdd: "own4address1",
			city: "own4city",
			state: "own4state",
			zip:"own4zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	}

tprUseCase.loginAs = function(webdriverClient, name, pass, seCret, url){

	return new webdriverModule.promise.Promise(function(resolve, reject){
		var browserUtility = browserUtilityModule.browserUtility;
		var getPromise = webdriverClient.get(url1);

		browserUtility.waitForWebTitle(webdriverClient, "Sign", 3000).then(function(newWebdriverClient){	
			
				browserUtility.sendKeysWebElement(newWebdriverClient,{id:'ctl00_ContentPlaceHolder1_UsernameTextBox'}, tprUser);
				browserUtility.sendKeysWebElement(newWebdriverClient,{id:'ctl00_ContentPlaceHolder1_PasswordTextBox'}, tprPass);		
				browserUtility.clickWebElement(newWebdriverClient,{id:'ctl00_ContentPlaceHolder1_SubmitButton'});

				if(url1 != "https://www.fraudguard.com/")
				{
					browserUtility.sendKeysWebElement(newWebdriverClient,{id:'ctl00_ContentPlaceHolder1_MFAtokenGenerator_txtSecurityQuestion'}, tprSec);
					browserUtility.clickWebElement(newWebdriverClient,{id:'ctl00_ContentPlaceHolder1_MFAtokenGenerator_btnContinue'});	
				}		

				browserUtility.waitForWebTitle(newWebdriverClient, "fraudguard", 3000).then(function(newWebdriverClient2){
					browserUtility.closeWindowByTitle(newWebdriverClient2, "Safe").then(function(isCloseSuccess){

						browserUtility.waitForWebTitle(newWebdriverClient2, "fraudguard", 3000).then(function(newWebdriverClient3){
							newWebdriverClient3.findElement({linkText:'Third Party Review'}).click();
							browserUtility.clickWebElement(newWebdriverClient3,{id:'submit1'});
				
							browserUtility.waitForWebTitle(newWebdriverClient3, "dev-fraudguard", 3000).then(function(newWebdriverClient4){
									
							resolve(newWebdriverClient4);	

						});
						

					});													
									
					});			
				});
				

			});	
	});
	
}

tprUseCase.loginIntranetAndReviewOrder = function(webdriverClient, name, pass, url, orderNumber){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		var browserUtility = browserUtilityModule.browserUtility;
		webdriverClient.get(url).then(function(){
			browserUtility.sendKeysWebElement(webdriverClient,{id:'UserId'}, name);
			browserUtility.sendKeysWebElement(webdriverClient,{id:'Password'}, pass);
			browserUtility.clickWebElement(webdriverClient,{id:'LogOn'});
			browserUtility.waitForWebTitle(webdriverClient, "Dashboard", 5000).then(function(newWebdriverClient){
				
					newWebdriverClient.findElement({id:'lnkTPR'}).click().then(function(){
						browserUtility.waitForWebTitle(newWebdriverClient, "reviewsearch", 5000).then(function(newWebdriverClient2){
							
								browserUtility.sendKeysWebElement(newWebdriverClient2,{id:'trannoid'}, orderNumber);
								waitForTPROrderV2(newWebdriverClient2, orderNumber).then(function(result){
									console.log("waitForTPROrder is done");
									if(result){
										console.log("order status is PENDING");
										browserUtility.waitForWebTitle(newWebdriverClient2, "reviewsearch", 5000).then(function(newWebdriverClient3){
										newWebdriverClient3.findElement({linkText:orderNumber.replace('\n','')}).click().then(function(){
											browserUtility.waitForWebTitle(newWebdriverClient3,"Alerts",5000).then(function(isItGood){
												if(isItGood){
													console.log("We are at review page.");
													resolve();
												}

											});
										});
									});
									}
									else{
										console.log("Order did not go through " + orderNumber);
									}									

								});							
							

						});

					});
			

			});


		}); // end of get promise

	}); // end of Promise
	
}

function waitForTPROrderV2(webdriverClient, orderNumber){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		console.log("Log: Entering waitForTPROrderV2 --- waiting for " + orderNumber);
		var browserUtility = browserUtilityModule.browserUtility;
			var isDone = 1;
			var intervalId = setInterval(function(){			
				 browserUtility.waitForWebTitle(webdriverClient,"reviewsearch",2000).then(function(newWebdriverClient){
					newWebdriverClient.findElement({id:'SearchReview'}).click().then(function(){					

					browserUtility.waitForWebTitle(newWebdriverClient,"reviewsearch",2000).then(function(newWebdriverClient2){							
						
							newWebdriverClient2.findElement({id:'Form1'}).getText().then(function(text){
								console.log("Log: " + "iteration " + isDone + " of waitForTPROrderV2 --- waiting for PENDING status of " + orderNumber);
								
								if(text.indexOf('PENDING') !== -1){
									clearInterval(intervalId);
									resolve(true);
									
								}
								else{
									if(++isDone == 20){
										clearInterval(intervalId);
										resolve(false);
										
									}
								}


							});

						//});
					});
				
					}); //end of click

				 });

			},10000);

	});

}


function waitForTPROrder(webdriverClient, orderNumber){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		var isDone = 0;
		for(var i = 0; i < 5; i++){
				webdriverClient.findElement({id:'SearchReview'}).click().then(function(){
						webdriverClient.wait(until.elementLocated({linkText:orderNumber}),5000).then(function(){
							webdriverClient.findElement({id:'Form1'}).getText().then(function(text){
								if(text.indexOf('PENDING') !== -1){
									resolve(true);
								}
								else{
									if(++isDone == 4){
										resolve(false);
									}
								}


							});

						});
				
				}); //end of click
		}
	}); //end of promise constructor

}


tprUseCase.printTprOrderNumber = function(webdriverClient){
	return new webdriverModule.promise.Promise(function(resolve, reject){
			var tprFormElement = webdriverClient.wait(until.elementLocated({name:'tp_review_step1'}), 5000);
			tprFormElement.then(function(element){
			var text = element.getText();
			text.then(function(textt){
			//console.log(textt);

			var indexOfTPROrder = textt.indexOf("TPR#:");
			var TPROrderNumber = textt.substring(indexOfTPROrder, indexOfTPROrder+14);
			console.log(TPROrderNumber);		
			
			tprUseCase.getTprOrderNumber(webdriverClient).then(function(orderNumber){
			
			tprUseCase.loginIntranetAndReviewOrder(webdriverClient, intranetUser, intranetPass, intranetUrl, orderNumber).then(function(){
					console.log("123");
					tprUseCase.getFicoScoreValue(webdriverClient,"0").then(function(fiCoIndex){

						console.log("Fico index: " + fiCoIndex);
						resolve();
					});

					
			});


		});

			


			},function(error){
				reject(error);
				console.log("log: error finding form element " + error);
			});	
		});

	});	
}

tprUseCase.getTprOrderNumber = function(webdriverClient){
	return new webdriverModule.promise.Promise(function(resolve, reject){
			var tprFormElement = webdriverClient.wait(until.elementLocated({name:'tp_review_step1'}), 8000);
			tprFormElement.then(function(element){
			var text = element.getText();
			text.then(function(textt){
			//console.log(textt);

			var indexOfTPROrder = textt.indexOf("TPR#:");
			var TPROrderNumber = textt.substring(indexOfTPROrder+6, indexOfTPROrder+14);				
			resolve(TPROrderNumber);
			},function(error){
				reject(error);
				console.log("log: error finding form element " + error);
			});	
		});

	});	
}


tprUseCase.getFicoScoreValue = function(webdriverClient){
	return new webdriverModule.promise.Promise(function(resolve, reject){
		webdriverClient.wait(until.elementLocated({id:'Form1' }), 8000).then(function(element){
			element.getText().then(function(text){
				var fico = "Fico Score:";
				var indexOfFico1 = text.indexOf(fico);
				console.log("FICO 1 " + text.substring(indexOfFico1 + 11, indexOfFico1 + 16));
				
				
				var substringAfterFico1 = text.substring(indexOfFico1 + 20);
				var indexOfFico2 = substringAfterFico1.indexOf(fico);
				console.log("index of FICO 2 " + indexOfFico2);

				var substringAfterFico2 = substringAfterFico1.substring(indexOfFico2 + 20);
				var indexOfFico3 = substringAfterFico2.indexOf(fico);
				console.log("index of FICO 3 " + indexOfFico3);

				var substringAfterFico3 = substringAfterFico2.substring(indexOfFico3 + 20);
				var indexOfFico4 = substringAfterFico3.indexOf(fico);
				console.log("index of FICO 4 " + indexOfFico4);

				var substringAfterFico4 = substringAfterFico3.substring(indexOfFico4 + 20);
				var indexOfFico5 = substringAfterFico4.indexOf(fico);
				console.log("index of FICO 4 " + indexOfFico5);

				

				resolve(indexOfFico1);
			});

		});
	});
}

function fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator){
	
	webdriverClient.findElement({name:agentSearchLocator.fName}).sendKeys(agentData.fName);
	webdriverClient.findElement({name:agentSearchLocator.lName}).sendKeys(agentData.lName);
	webdriverClient.findElement({name:agentSearchLocator.mName}).sendKeys(agentData.mName);
	webdriverClient.findElement({name:agentSearchLocator.ssna}).sendKeys(agentData.ssna);
	webdriverClient.findElement({name:agentSearchLocator.ssnb}).sendKeys(agentData.ssnb);
	webdriverClient.findElement({name:agentSearchLocator.ssnc}).sendKeys(agentData.ssnc);
	webdriverClient.findElement({name:agentSearchLocator.strAdd}).sendKeys(agentData.strAdd);
	webdriverClient.findElement({name:agentSearchLocator.city}).sendKeys(agentData.city);
	webdriverClient.findElement({name:agentSearchLocator.zip}).sendKeys(agentData.zip);
	browserUtility.clickComboboxOptionByIndex(webdriverClient, {name:agentSearchLocator.state}, 6).then(function(){
					
	});
	

}

module.exports.tprUseCase = tprUseCase;