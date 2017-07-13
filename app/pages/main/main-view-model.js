var observable = require("data/observable").Observable;
var requestor = require("../../common/requestor");
var constants = require("../../common/constants");
var geolocation = require("nativescript-geolocation");
var moment = require('moment-mini');
var utilities = require('../../common/utilities');
var locationStore = require('../../stores/location');


exports.createViewModel = function() {
  var viewModel = new observable();

  if (!geolocation.isEnabled()) {
    geolocation.enableLocationRequest();
  }

  viewModel.setIcons = function() {
    var icons = utilities.getIcons([
      'temperature', 'wind', 'cloud',
      'pressure', 'humidity', 'rain',
      'sunrise', 'sunset'
    ]);
    icons.forEach((item) => {
      this.set(`${item.name}_icon`, item.icon);
    });
  }
  var time_of_day = utilities.getTimeOfDay();
  viewModel.set('background_class',time_of_day);
  viewModel.setIcons();

  viewModel.setLocation = function() {
    var location = geolocation
    .getCurrentLocation({timeout: 10000})
    .then((loc) => {
      if (loc) {
        locationStore.saveLocation(loc);
        this.set('is_loading', true);
        var url = `${constants.WEATHER_URL}${constants.CURRENT_WEATHER_PATH}?lat=${loc.latitude}&lon=${loc.longitude}&apikey=${constants.WEATHER_APIKEY}`;
        
        var res = requestor.get(url)
        .then((res) => {
          var weather = res.weather[0].main.toLowerCase();
          var weather_description = res.weather[0].description;

          var temperature = res.main.temp;
          var icon = constants.WEATHER_ICONS[time_of_day][weather];

          var rain = '0';
          if(res.rain){
              rain = res.rain['3h'];
          }

          this.set('icon', String.fromCharCode(icon));
          this.set('weather', weather_description);
          this.set('temperature',`${utilities.describeTemperature(Math.floor(temperature))} (${utilities.convertKelvinToCelsius(temperature).toFixed(2)} °C)`);
          this.set('place', `${res.name}, ${res.sys.country}`);
          this.set('wind', `${utilities.describeWindSpeed(res.wind.speed)} ${res.wind.speed}m/s ${utilities.degreeToDirection(res.wind.deg)} (${res.wind.deg}°)`);
          this.set('clouds', `${res.clouds.all}%`);
          this.set('pressure', `${res.main.pressure} hpa`);
          this.set('humidity', `${utilities.describeHumidity(res.main.humidity)} (${res.main.humidity}%)`);
          this.set('rain', `${rain}%`);
          this.set('sunrise', moment.unix(res.sys.sunrise).format('hh:mm a'));
          this.set('sunset', moment.unix(res.sys.sunset).format('hh:mm a'));

          this.set('is_loading', false);
        });

      }
    }, (e) => {
      alert(e.message);
    });
  }
  viewModel.setLocation();

  return viewModel;
};
