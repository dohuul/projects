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




