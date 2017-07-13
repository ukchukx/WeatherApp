var navigation = require('../../common/navigation');
var createViewModel = require('./forecast-view-model').createViewModel;

exports.navigatingTo = function(args) {
  args.object.bindingContext = createViewModel();
}

exports.goToMainPage = function() {
  navigation.goToMainPage();
}
