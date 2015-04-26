console.log("enter test")

var webdriverFactoryModule = require('../../../utility/webdriverFactory.js');
var tprUsecaseModule = require('../tprUseCase.js');
var browserUtilityModule = require("../../../utility/browserUtility.js");

var webdriverClient = webdriverFactoryModule.webdriverFactory.createWebdriverClientFor("chrome");
var tprUseCase = tprUsecaseModule.tprUseCase;
var browserUtility = browserUtilityModule.browserUtility;

var tprUser = "spyle";
var tprPass = "lemiller";

var url = "https://dev-tools.sysdome.com/SysdomeIntranet/login.aspx";

var tprUseCaseInstance = tprUsecaseModule.tprUseCase;

tprUseCaseInstance.loginIntranetAs(webdriverClient,tprUser, tprPass, url,"111111").then(function(){

	console.log("123");
})