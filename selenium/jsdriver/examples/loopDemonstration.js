var webdriverModule = require('selenium-webdriver');


doSomethingAsynAndCallBack(myCallBack);


function myCallBack(text){
	console.log(text);
}

function doSomethingAsynAndCallBack(callBack){
	var isDone = 0;

	for(var i = 0; i < 2; i++){

		var currentPromise = doSomethingAsyn(i);

		//if promise fullfilled, do the following with text as parameter
		currentPromise.then(function(text){

			console.log(text);

			//at the time the promise fullfilled i already has a value of 2 so this will never go through
			if(i == 1){
			 	callBack("Hello");
			}

		})

	}

	

}


function doSomethingAsyn(index){
	return new webdriverModule.promise.Promise(function(resolve,reject){
		var text = "";
		for(var i = 0; i < 10; i++){
		    text = text +  " loop number " + index + ": " + i + "\n";
		}
		resolve(text);

	})
	
}