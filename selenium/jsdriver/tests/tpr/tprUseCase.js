var browserUtilityModule = require("../../utility/browserUtility.js");

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
	}

}

tprUseCase.loginAs = function(webdriverClient, name, pass, seCret, url){
	var browserUtility = browserUtilityModule.browserUtility;
	var getPromise = webdriverClient.get(url);

	browserUtility.waitForWebTitle(webdriverClient, "Sign", 3000).then(function(newWebDriverClient){
		if(doesTitleFound){
			browserUtility.sendKeysWebElement(webdriverClient,{id:'ctl00_ContentPlaceHolder1_UsernameTextBox'}, name);
			browserUtility.sendKeysWebElement(webdriverClient,{id:'ctl00_ContentPlaceHolder1_PasswordTextBox'}, pass);

		}	

	})	


}

tprUseCase.loginIntranetAs = function(webdriverClient, name, pass, seCret, url){


}


function fillGenericAgentInformation(webdriverClient,agentData, agentSearchLocator){
	var waitForAgentTextBoxPromise = webdriverClient.wait(until.elementLocated({name:agentSearchLocator.fName}), 1000);

	waitForAgentTextBoxPromise.then(function(webElement){
		console.log("Logging---waitForAgentTextBoxPromise fullfilled");	
	webElement.sendKeys(agentData.fName);

	},function(error){

	console.log("Logging---waitForAgentTextBoxPromise failed");
	});

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