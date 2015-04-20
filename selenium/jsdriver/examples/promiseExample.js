var webdriverModule = require('selenium-webdriver');


var dummyObj = {

	sayHello : function(name){

		return new webdriverModule.promise.Promise(function(resolve,reject){
			if(name == null){
				return reject("name cannot be null");
			}
			else{
				return resolve();
			}

		})
	}
}



dummyObj.sayHello("k").then(function(resovlerPar1){

	console.log(resovlerPar1);
},function(error){

	console.log(error);
})
console.log("123")

