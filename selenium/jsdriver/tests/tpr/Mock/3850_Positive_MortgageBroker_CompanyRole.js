console.log("enter test")

var webdriverFactoryModule = require('../../../utility/webdriverFactory.js');
var tprUsecaseModule = require('../tprUseCase.js');
var browserUtilityModule = require("../../../utility/browserUtility.js");

var webdriverClient = webdriverFactoryModule.webdriverFactory.createWebdriverClientFor("chrome");
var tprUseCase = tprUsecaseModule.tprUseCase;
var browserUtility = browserUtilityModule.browserUtility;

var tprUser = "spyle";
var tprPass = "Lem1ller";
var tprSec = "ellen";
var url = "https://dev-logins.interthinx.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fwww.dev-fraudguard.com%2fSysdome2010%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fSysdome2010%252f&wct=2015-03-26T18%3a56%3a43Z";

tprUseCase.loginAs(webdriverClient,tprUser,tprPass, tprSec, url).then(function(newWebdriverClient){

	var companyData = {
		name : "MortgageBrokerCompany3850Positive",
		address : "8782 Lanark Cir",
		city : "Huntington Beach",
		zip : "92646",
		state: "CA"
	}

	tprUseCase.fillOutCompanyInformation(newWebdriverClient,companyData).then(function(currentWebdriverClient){
				
		var agentOneData = {
		fName : "FIRSTNAMEMOCK5",
		lName : 'LASTNAMEMOCK5',
		mName: "M",
		ssna : '',
		ssnb : '',
		ssnc : '',
		strAdd : '1627 S Berendo St Apt 1629',
		city : 'Los Angeles',
		zip : '90006'
		}

		tprUseCase.fillOutAgentOneInformation(currentWebdriverClient,agentOneData);

		var agentTwoData = {
		fName : "FIRSTNAMEMOCK6",
		lName : 'LASTNAMEMOCK',
		mName: "D",
		ssna : '',
		ssnb : '',
		ssnc : '',
		strAdd : '27484 Acacia Dr',
		city : 'Valencia',
		zip : '91354'
		}
		tprUseCase.fillOutAgentTwoInformation(currentWebdriverClient,agentTwoData);

		var agentThreeData = {
		fName : "FIRSTNAMEMOCK7",
		lName : 'LASTNAMEMOCK',
		mName: "C",
		ssna : '',
		ssnb : '',
		ssnc : '',
		strAdd : '2541 E Avenue J4',
		city : 'LANCASTER',
		zip : '93636'
		}
		tprUseCase.fillOutAgentThreeInformation(currentWebdriverClient,agentThreeData);

		var agentFourData = {
		fName : "FIRSTNAMEMOCK8",
		lName : 'LASTNAMEMOCK',
		mName: "A",
		ssna : '',
		ssnb : '',
		ssnc : '',
		strAdd : '6091 Red Hill Ct',
		city : 'Fontana',
		zip : '92336'
		}
		tprUseCase.fillOutAgentFourInformation(currentWebdriverClient,agentFourData);

		currentWebdriverClient.findElement({name:'submitOrder'}).click();

		tprUseCase.printTprOrderNumber(currentWebdriverClient);
		
		

	}, function(error){
		console.log("log: error"  +error);

	});

});


