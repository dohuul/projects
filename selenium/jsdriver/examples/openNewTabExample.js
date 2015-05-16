console.log("Enter Test");

var webDriverModule = require('selenium-webdriver');
var webDriverFactoryModule = require('../utility/webdriverFactory.js');
var browserUtilityModule = require('../utility/browserUtility.js')

var browserName = "chrome";
var webDriverFactory = webDriverFactoryModule.webdriverFactory;
var browserUtility = browserUtilityModule.browserUtility;

var webdriver = webDriverFactory.createWebdriverClientFor(browserName);

var getUrlPromise = webdriver.get('https://fraudguard.interthinx.com');

getUrlPromise.then(function(){
 browserUtility.openUrlInNewTab(webdriver,'https://google.com');

});