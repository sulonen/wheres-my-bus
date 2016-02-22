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

  Location.checkAvailability = function() {
    if (navigator.geolocation){
      return true;
    }
  };

  module.Location = Location;

})(window);
