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
var url = "https://www.fraudguard.com/";


tprUseCase.loginAs(webdriverClient,tprUser,tprPass, tprSec, url).then(function(newWebdriverClient){	
		
	browserUtility.clickRadioButtonByIndex(newWebdriverClient, {name:'requestentity'}, 1).then(function(){

		var appraiserFirmData = {
			name : "AppraiserFirmCompanyNegativeTestFor1039",
			fName : "James",
			lName : 'LASTNAMEMOCK5',
			mName : 'M',
			ssna : '666',
			ssnb : '11',
			ssnc : '1115',
			address : '1627 S Berendo St Apt 1629',
			city : 'Los Angeles',
			zip : '90006'
			}

		tprUseCase.fillOutAppraiserFirm(newWebdriverClient,appraiserFirmData).then(function(currentWebdriverClient){			
				tprUseCase.printTprOrderNumber(currentWebdriverClient);				
				browserUtility.closeWindowByTitle(currentWebdriverClient, "Safe");
				});
		});
	});




