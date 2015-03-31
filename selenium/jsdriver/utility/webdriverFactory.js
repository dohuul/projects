var webdriverModule = require('selenium-webdriver');

var webdriverFactory = new Object();

webdriverFactory.createWebdriverClientFor = function(browserName){
	return new webdriverModule.Builder()
    .forBrowser(browserName)
    .build();
}

webdriverFactory.createWebDriverForWithCapabilities = function(browserName){
		var capabilitiesObj = null;
		switch(browserName){
			case "ie":
				capabilitiesObj = webdriverModule.Capabilities.ie();
				break;
			case "firefox":
				capabilitiesObj = webdriverModule.Capabilities.firefox();
				break;
			case "chrome":
				capabilitiesObj = webdriverModule.Capabilities.chrome();
				break;
			case "phantomjs":
				capabilitiesObj = webdriverModule.Capabilities.phantomjs();
			default:
				break;

			}

	return new webdriverModule.Builder()
							.withCapabilities(capabilitiesObj)
							.build();
}

module.exports.webdriverFactory = webdriverFactory;