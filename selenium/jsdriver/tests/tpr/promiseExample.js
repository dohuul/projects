var webdriverModule = require('selenium-webdriver');


var dummyObj = {

	sayHello : function(name){

		return new webdriverModule.promise.Promise(function(resolve,reject){
			if(name == null){
				return reject("name cannot be null");
			}
			else{
				return resolve(name);
			}

		})
	}
}



dummyObj.sayHello(null).then(function(name){

	console.log(name);
},function(error){

	console.log(error);
})

