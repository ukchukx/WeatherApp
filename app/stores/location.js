var location;
 
const saveLocation = function(loc) {
  location = loc;
}
 
const getLocation = function() {
  return location;
}

module.exports = {
  location,
  saveLocation,
  getLocation
};