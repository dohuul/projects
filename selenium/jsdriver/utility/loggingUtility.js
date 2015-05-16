var Logger = new Object();
var isGlobalLogDisabled = false;

Logger.log = function(message){
	if(isGlobalLogDisabled != true){	
			console.log(message);		
	}

} 

module.exports.loggerUtility = Logger;