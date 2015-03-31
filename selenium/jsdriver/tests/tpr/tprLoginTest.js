console.log("enter test")

var webdriverFactoryModule = require('../../utility/webdriverFactory.js');
var tprUsecaseModule = require('./tprUseCase.js');

var webdriverClient = webdriverFactoryModule.webdriverFactory.createWebdriverClientFor("chrome");

var tprUseCase = tprUsecaseModule.tprUseCase;

var tprUser = "spyle";
var tprPass = "Lem1ller";
var tprSec = "ellen";
var url = "https://dev-logins.interthinx.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fwww.dev-fraudguard.com%2fSysdome2010%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fSysdome2010%252f&wct=2015-03-26T18%3a56%3a43Z";

tprUseCase.loginAs(webdriverClient,tprUser,tprPass, tprSec, url);