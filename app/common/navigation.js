var frame = require('ui/frame');
 
exports.getStartPage = function() {
  return 'pages/main/main';
}
 
exports.goToForecastPage = function() {
  frame.topmost().navigate('pages/forecast/forecast');
}
 
exports.goToMainPage = function() {
  frame.topmost().goBack();
}