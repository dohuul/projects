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

			elements[3].getAttribute("value").then(function(elementValue){
				console.log(elementValue);
				if(elementValue == "23"){
					elements[3].click().then(function(){
								
    					
								newWebdriverClient.findElements({name:'reviewtypelevelid'}).then(function(elements1){
				
							

										elements1[1].getAttribute("value").then(function(attributeValue){
										console.log(attributeValue)
										if(attributeValue == "2"){

										elements1[1].click().then(function(){
										var brokerData = {
										fName : "FIRSTNAMEMOCK5",
										lName: "LASTNAMEMOCK",
										mName: "M",
										address : "14702 OTSEGO ST 4",
										city : "SHERMAN OAKS",
										zip : "91403",
										state: "CA",
										ssna: "666",
										ssnb: "11",
										ssnc: "1115"
										}

								tprUseCase.fillOutIndividualBroker(newWebdriverClient,brokerData).then(function(currentWebdriverClient){
														
								tprUseCase.printTprOrderNumber(currentWebdriverClient);		

								}, function(error){
									console.log("log: error"  +error);

								});

					})

				}

			})
		

	})

    						
								

					},function(error){console.log(error)})
				}
			});
			
	});	





	
	


});



