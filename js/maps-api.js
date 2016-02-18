(function(module) {
  function Location(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.position = {
      lat: latitude,
      lng: longitude
    };
    this.mapCenter = new google.maps.LatLng(latitude, longitude);
    this.mapOptions = {
      zoom: 17,
      center: this.mapCenter,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
  }

  Location.prototype.checkAvailability = function() {
    if (navigator.geolocation){
      return true;
    }
  };

  module.Location = Location;
  module.Location.checkAvailability = Location.prototype.checkAvailability;

})(window);
