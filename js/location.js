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

  Location.getStops = function(location, callback) {
    $.get('/oneBusAway/where/stops-for-location.jsonTEST'
            + '&lat=' + location.latitude
            + '&lon=' + location.longitude
            + '&radius=200')
    .done(function(data, message, xhr) {
      location.stopsData = JSON.parse(data);
      location.stopsList = location.stopsData.data.list;
      if (callback) callback();
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ', ' + error;
      console.log('Request Failed: ' + err);
    });
  };

  module.Location = Location;
})(window);
