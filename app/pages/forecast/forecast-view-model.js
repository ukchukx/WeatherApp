var observable = require("data/observable").Observable;
var requestor = require("../../common/requestor");
var constants = require("../../common/constants");
var moment = require('moment-mini');
var utilities = require('../../common/utilities');
var locationStore = require('../../stores/location');


exports.createViewModel = function() {
  var viewModel = new observable();

  var location = locationStore.getLocation();
  var url = `${constants.WEATHER_URL}${constants.WEATHER_FORECAST_PATH}?cnt=6&lat=${location.latitude}&lon=${location.longitude}&apikey=${constants.WEATHER_APIKEY}`;

  var time_of_day = utilities.getTimeOfDay();
  viewModel.set('is_loading', true);
  viewModel.set('background_class', time_of_day);

  viewModel.setIcons = function() {
    var icons = utilities.getIcons(['temperature', 'wind', 'cloud', 'pressure']);
    icons.forEach((item) => {
      this.set(`${item.name}_icon`, item.icon);
    });
  }
  viewModel.setIcons();

  viewModel.getForecast = function(response) {
    var forecast = [];
    var list = response.list.splice(1);
    list.forEach((item) => {
      forecast.push({
        day: moment.unix(item.dt).format('MMM DD (ddd)'),
        icon: String.fromCharCode(constants.WEATHER_ICONS['day'][item.weather[0].main.toLowerCase()]),
        temperature: {
          day: `${utilities.describeTemperature(item.temp.day)}`,
          night: `${utilities.describeTemperature(item.temp.night)}`
        },
        wind: `${item.speed}m/s`,
        clouds: `${item.clouds}%`,
        pressure: `${item.pressure} hpa`,
        description: item.weather[0].description
      })
    });

    return forecast;
  } 

  requestor.get(url)
  .then((response) => {
    viewModel.set('is_loading', false);
    var forecast = viewModel.getForecast(response);
    viewModel.set('forecast', forecast);
  });


  return viewModel;
};
