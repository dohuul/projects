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
	
		newWebdriverClient.findElements({name:'requestentity'}).then(function(elements){
	
			elements[5].getAttribute("value").then(function(elementValue){
			console.log(elementValue);
				if(elementValue == "60"){
				
					elements[5].click().then(function(){


								var companyData = {
								name : "OtherCompany1039NegativeTest",
								address : "8782 Lanark Cir",
								city : "Huntington Beach",
								zip : "92646",
								state: "CA"
						}

			tprUseCase.fillOutCompanyInformation(newWebdriverClient,companyData).then(function(currentWebdriverClient){
				
				var agentOneData = {
				fName : "MOCKFIRSTNAME1",
				lName : 'MOCKLASTNAME1',
				mName : 'MOCKMIDDLENAME1',
				ssna : '666',
				ssnb : '11',
				ssnc : '1111',
				strAdd : '1627 S Berendo St Apt 1629',
				city : 'Los Angeles',
				zip : '90006'
				}

				tprUseCase.fillOutAgentOneInformation(currentWebdriverClient,agentOneData);

				var agentTwoData = {
				fName : "MOCKFIRSTNAME2",
				lName : 'MOCKLASTNAME2',
				mName : 'MOCKMIDDLENAME2',
				ssna : '666',
				ssnb : '11',
				ssnc : '1111',
				strAdd : '27484 Acacia Dr',
				city : 'Valencia',
				zip : '91354'
				}
				tprUseCase.fillOutAgentTwoInformation(currentWebdriverClient,agentTwoData);

				var agentThreeData = {
				fName : "MOCKFIRSTNAME3",
				lName : 'MOCKLASTNAME3',
				mName : 'MOCKMIDDLENAME3',
				ssna : '666',
				ssnb : '11',
				ssnc : '1112',
				strAdd : '2541 E Avenue J4',
				city : 'LANCASTER',
				zip : '93636'
				}
				tprUseCase.fillOutAgentThreeInformation(currentWebdriverClient,agentThreeData);

				var agentFourData = {
				fName : "MOCKFIRSTNAME4",
				lName : 'MOCKLASTNAME4',
				mName : 'MOCKMIDDLENAME4',
				ssna : '666',
				ssnb : '11',
				ssnc : '1112',
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
				}

		});

	});

});


