const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
// 06b02754433450958a62634a25985945
// 140ec3a7f05495ab87690279a98f93c7
// 264a4855a3aeeb5196ff38e3d006cbe9
const WEATHER_APIKEY = '649108751d4e5eaa0edaa8cfa845450b';
const CURRENT_WEATHER_PATH = 'weather/';
const WEATHER_FORECAST_PATH = 'forecast/daily/';
 
const WEATHER_ICONS = {
  day: {
    'clear': 0xf00d,
    'clouds': 0xf002,
    'drizzle': 0xf009,
    'rain': 0xf008,
    'thunderstorm': 0x010,
    'snow': 0xf00a,
    'mist': 0xf0b6
  },
  night: {
    'clear': 0xf02e,
    'clouds': 0xf086,
    'drizzle': 0xf029,
    'rain': 0xf028,
    'thunderstorm': 0xf02d,
    'snow': 0xf02a,
    'mist': 0xf04a
  },
  neutral: {
    'temperature': 0xf055,
    'wind': 0xf050,
    'cloud': 0xf041,
    'pressure': 0xf079,
    'humidity': 0xf07a,
    'rain': 0xf019,
    'sunrise': 0xf046,
    'sunset': 0xf052
  }
};
 
const WIND_DIRECTIONS = [
  "North", "North-northeast", "Northeast",
  "East-northeast", "East", "East-southeast", "Southeast",
  "South-southeast", "South", "South-southwest", "Southwest",
  "West-southwest", "West", "West-northwest", "Northwest", "North-northwest"
];

module.exports = {
  WEATHER_URL,
  WEATHER_APIKEY,
  CURRENT_WEATHER_PATH,
  WEATHER_FORECAST_PATH,
  WEATHER_ICONS,
  WIND_DIRECTIONS
};