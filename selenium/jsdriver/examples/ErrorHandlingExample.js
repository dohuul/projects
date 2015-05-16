console.log("Enter Test");

var webDriverModule = require('selenium-webdriver');
var webDriverFactoryModule = require('../utility/webdriverFactory.js');
var browserUtilityModule = require('../utility/browserUtility.js')


function ReturnText(text){
	return new webDriverModule.promise.Promise(function(resolve, reject){
		if(text == null){
			throw "text is null";
		}
		else if(text == ""){
			reject("text is empty");
		}
		else		{
			resolve(text);
		}
	
	});
}


var aPromise = ReturnText("Hello");
aPromise.then(function(text){
	console.log(text);

	var anotherPromise = ReturnText("");
	anotherPromise.then(function(text){
		console.log(text);
	}, function(error){
		console.log("Error: " + error);
	});	

});

var bPromise = ReturnText("");
bPromise.then(function(text){
	console.log(text);

}, function(error){
	console.log("Error: " + error);
});

var cPromise = ReturnText(null);
cPromise.then(function(text){
	console.log(text);

}, function(error){
	console.log("Error: " + error);
});