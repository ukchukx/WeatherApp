require("./bundle-config");
var application = require("application");
var navigation = require('./common/navigation');

application.start({ moduleName: navigation.getStartPage() });
