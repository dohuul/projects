var browserUtilityModule = require("../../utility/browserUtility.js");
var webdriverModule = require('selenium-webdriver');
var Key = webdriverModule.Key;
var until = webdriverModule.until;
var by = webdriverModule.By;

var tprUseCase = {
	fillOutAgentOneInformation : function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own1fname",
			lName:"own1lname",
			ssna: "own1ssna",
			ssnb: "own1ssnb",
			ssnc: "own1ssnc",
			strAdd: "own1address1",
			city: "own1city",
			state: "own1state",
			zip:"own1zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	},

	fillOutAgentTwoInformation : function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own2fname",
			lName:"own2lname",
			ssna: "own2ssna",
			ssnb: "own2ssnb",
			ssnc: "own2ssnc",
			strAdd: "own2address1",
			city: "own2city",
			state: "own2state",
			zip:"own2zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	},

	fillOutAgentThreeInformation : function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own3fname",
			lName:"own3lname",
			ssna: "own3ssna",
			ssnb: "own3ssnb",
			ssnc: "own3ssnc",
			strAdd: "own3address1",
			city: "own3city",
			state: "own3state",
			zip:"own3zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	},

	fillOutAgentFourInformation : function(webdriverClient,agentData){
		var agentSearchLocator = {
			fName: "own4fname",
			lName:"own4lname",
			ssna: "own4ssna",
			ssnb: "own4ssnb",
			ssnc: "own4ssnc",
			strAdd: "own4address1",
			city: "own4city",
			state: "own4state",
			zip:"own4zipcode"

		}

		fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator);
	},

	fillOutCompanyInformation: function(webdriverClient, companyData){

		return new webdriverModule.promise.Promise(function(resolve, reject){
			webdriverClient.findElement({name:'cmpcompanyname'}).sendKeys(companyData.name);
			webdriverClient.findElement({name:'cmpaddress1'}).sendKeys(companyData.address);
			webdriverClient.findElement({name:'cmpcity'}).sendKeys(companyData.city);
			webdriverClient.findElement({name:'cmpzipcode'}).sendKeys(companyData.zip);
			var combobox1 = webdriverClient.findElement({name:'cmpstate'})
			combobox1.click();
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.ENTER);
			webdriverClient.findElement({name:'tprsubmit'}).click();

			resolve(webdriverClient);

		});
	},

	fillOutIndividualBroker: function(webdriverClient, brokerData){
		return new webdriverModule.promise.Promise(function(resolve, reject){
			webdriverClient.findElement({name:'own1fname'}).sendKeys(brokerData.fName);
			webdriverClient.findElement({name:'own1lname'}).sendKeys(brokerData.lName);
			webdriverClient.findElement({name:'own1Address1'}).sendKeys(brokerData.address);
			webdriverClient.findElement({name:'own1city'}).sendKeys(brokerData.city);
			webdriverClient.findElement({name:'own1zipcode'}).sendKeys(brokerData.zip);

			webdriverClient.findElement({name:'cmpaddress1'}).sendKeys(brokerData.address);
			webdriverClient.findElement({name:'cmpcity'}).sendKeys(brokerData.city);
			webdriverClient.findElement({name:'cmpzipcode'}).sendKeys(brokerData.zip);




			var combobox1 = webdriverClient.findElement({name:'own1state'})
			combobox1.click();
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.ENTER);

			var combobox2 = webdriverClient.findElement({name:'cmpstate'})
			combobox2.click();
			combobox2.sendKeys(Key.DOWN);
			combobox2.sendKeys(Key.DOWN);
			combobox2.sendKeys(Key.DOWN);
			combobox2.sendKeys(Key.DOWN);
			combobox2.sendKeys(Key.DOWN);
			combobox2.sendKeys(Key.DOWN);
			combobox2.sendKeys(Key.ENTER);

			webdriverClient.findElement({name:'tprsubmit'}).click().then(function(){

				resolve(webdriverClient);
			})

			

		});		
	},

	fillOutAppraiserFirm: function(webdriverClient, appraiserFirmData){
		return new webdriverModule.promise.Promise(function(resolve, reject){
			webdriverClient.findElement({name:'own1fname'}).sendKeys(appraiserFirmData.fName);
			webdriverClient.findElement({name:'own1lname'}).sendKeys(appraiserFirmData.lName);
			webdriverClient.findElement({name:'own1Address1'}).sendKeys(appraiserFirmData.address);
			webdriverClient.findElement({name:'own1city'}).sendKeys(appraiserFirmData.city);
			webdriverClient.findElement({name:'own1zipcode'}).sendKeys(appraiserFirmData.zip);

			webdriverClient.findElement({name:'cmpcompanyname'}).sendKeys(appraiserFirmData.name);
			
			webdriverClient.findElement({name:'own1ssna'}).sendKeys(appraiserFirmData.ssna);
			webdriverClient.findElement({name:'own1ssnb'}).sendKeys(appraiserFirmData.ssnb);
			webdriverClient.findElement({name:'own1ssnc'}).sendKeys(appraiserFirmData.ssnc);



			var combobox1 = webdriverClient.findElement({name:'own1state'})
			combobox1.click();
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.DOWN);
			combobox1.sendKeys(Key.ENTER);
			

			webdriverClient.findElement({name:'tprsubmit'}).click().then(function(){

				resolve(webdriverClient);
			})

			

		});		


	}
}

tprUseCase.loginAs = function(webdriverClient, name, pass, seCret, url){

	return new webdriverModule.promise.Promise(function(resolve, reject){
		var browserUtility = browserUtilityModule.browserUtility;
		var getPromise = webdriverClient.get(url);

		browserUtility.waitForWebTitle(webdriverClient, "Sign", 3000).then(function(newWebDriverClient){		
			browserUtility.sendKeysWebElement(newWebDriverClient,{id:'ctl00_ContentPlaceHolder1_UsernameTextBox'}, name);
			browserUtility.sendKeysWebElement(newWebDriverClient,{id:'ctl00_ContentPlaceHolder1_PasswordTextBox'}, pass);		
			browserUtility.clickWebElement(newWebDriverClient,{id:'ctl00_ContentPlaceHolder1_SubmitButton'});
			browserUtility.sendKeysWebElement(newWebDriverClient,{id:'ctl00_ContentPlaceHolder1_MFAtokenGenerator_txtSecurityQuestion'}, seCret);
			browserUtility.clickWebElement(newWebDriverClient,{id:'ctl00_ContentPlaceHolder1_MFAtokenGenerator_btnContinue'});	


			browserUtility.waitForWebTitle(newWebDriverClient, "dev-fraudguard", 3000).then(function(newWebdriverClient){

				webdriverClient.findElement({linkText:'Third Party Review'}).click();
				browserUtility.clickWebElement(newWebDriverClient,{id:'submit1'});
					browserUtility.waitForWebTitle(newWebDriverClient, "dev-fraudguard", 3000).then(function(anotherNewWebdriverClient){

						resolve(anotherNewWebdriverClient);
					});
				

			},function(error){				
				console.log("log: error waitForWebTitle dev-fraudguard promise failed " + error);
				reject(error);
			});

		},function(error){
			console.log("log: error waitForWebTitle Sign failed");
			reject(error);
		})	


	});
	
}

tprUseCase.loginIntranetAs = function(webdriverClient, name, pass, seCret, url){


}


tprUseCase.printTprOrderNumber = function(webdriverClient){
	return new webdriverModule.promise.Promise(function(resolve, reject){
			var tprFormElement = webdriverClient.wait(until.elementLocated({name:'tp_review_step1'}), 5000);
			tprFormElement.then(function(element){
			var text = element.getText();
			text.then(function(textt){
			console.log(textt);

			var indexOfTPROrder = textt.indexOf("TPR#:");
			var TPROrderNumber = textt.substring(indexOfTPROrder, indexOfTPROrder+14);
			console.log(TPROrderNumber);		
			resolve();
			},function(error){
				reject(error);
				console.log("log: error finding form element " + error);
			});	
		});

	});	
}

function fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator){
	console.log("log:123 " + webdriverClient);

/*
	var browserUtility = browserUtilityModule.browserUtility;
	var waitForAgentTextBoxPromise = browserUtility.waitForWebElement(webdriverClient, agentSearchLocator, 2000);
	//var waitForAgentTextBoxPromise = webdriverClient.wait(until.elementLocated({name:agentSearchLocator.fName}), 1000);

	waitForAgentTextBoxPromise.then(function(webElement){
		console.log("Logging---waitForAgentTextBoxPromise fullfilled");	
		webElement.sendKeys(agentData.fName);

	},function(error){

	console.log("Logging---waitForAgentTextBoxPromise failed");
	});
*/
	webdriverClient.findElement({name:agentSearchLocator.fName}).sendKeys(agentData.fName);
	webdriverClient.findElement({name:agentSearchLocator.lName}).sendKeys(agentData.lName);
	webdriverClient.findElement({name:agentSearchLocator.ssna}).sendKeys(agentData.ssna);
	webdriverClient.findElement({name:agentSearchLocator.ssnb}).sendKeys(agentData.ssnb);
	webdriverClient.findElement({name:agentSearchLocator.ssnc}).sendKeys(agentData.ssnc);
	webdriverClient.findElement({name:agentSearchLocator.strAdd}).sendKeys(agentData.strAdd);
	webdriverClient.findElement({name:agentSearchLocator.city}).sendKeys(agentData.city);
	webdriverClient.findElement({name:agentSearchLocator.zip}).sendKeys(agentData.zip);
	var combobox1 = webdriverClient.findElement({name:agentSearchLocator.state})
	combobox1.click();
	combobox1.sendKeys(Key.DOWN);
	combobox1.sendKeys(Key.DOWN);
	combobox1.sendKeys(Key.DOWN);
	combobox1.sendKeys(Key.DOWN);
	combobox1.sendKeys(Key.DOWN);
	combobox1.sendKeys(Key.DOWN);
	combobox1.sendKeys(Key.ENTER);

}

module.exports.tprUseCase = tprUseCase;