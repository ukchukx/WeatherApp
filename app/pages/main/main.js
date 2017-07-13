var createViewModel = require('./main-view-model').createViewModel;
var navigation = require('../../common/navigation');

exports.navigatingTo = function(args) {
  args.object.bindingContext = createViewModel();
}

exports.goToForecastPage = function() {
  navigation.goToForecastPage();
}
