console.log("Enter Test");

var webDriverModule = require('selenium-webdriver');
var webDriverFactoryModule = require('../utility/webdriverFactory.js');
var browserUtilityModule = require('../utility/browserUtility.js')

recursiveHello("Hello",5);


console.log("Exit test");

function recursiveHello(text, numberOfTimes){
	if(numberOfTimes == 0){
		console.log("Done");
	}
	else{
		
		console.log(text);
		recursiveHello(text, numberOfTimes - 1);
	
	}

}