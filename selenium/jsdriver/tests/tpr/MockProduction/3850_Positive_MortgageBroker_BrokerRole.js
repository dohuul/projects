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

	newWebdriverClient.findElements({name:'reviewtypelevelid'}).then(function(elements){
		for(var elementId in elements){

			elements[elementId].getAttribute("value").then(function(attributeValue){
				console.log(attributeValue)
				if(attributeValue == "2"){

					elements[elementId].click().then(function(){
								var brokerData = {
										fName : "FIRSTNAMEMOCK5",
										lName: "LASTNAMEMOCK5",
										mName: "D",
										address : "14702 OTSEGO ST 4",
										city : "SHERMAN OAKS",
										zip : "91403",
										state: "CA",
										ssna: "",
										ssnb: "",
										ssnc: ""
										}

					tprUseCase.fillOutIndividualBroker(newWebdriverClient,brokerData).then(function(currentWebdriverClient){
														
					tprUseCase.printTprOrderNumber(currentWebdriverClient);		

					}, function(error){
						console.log("log: error"  +error);

					});

					})

				}

			})
		}

	})
	


});



