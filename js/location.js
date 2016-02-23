(function(module) {
  function Location(latitude, longitude, callback) {
    var _this = this;
    $.get('/oneBusAway/where/stops-for-location.jsonTEST'
          + '&lat=' + latitude
          + '&lon=' + longitude
          + '&radius=200')
    .done(function(data, message, xhr) {
      _this.stopsData = JSON.parse(data);
      _this.stopsList = _this.stopsData.data.list;

      _this.latitude = latitude;
      _this.longitude = longitude;
      _this.position = {
        lat: latitude,
        lng: longitude
      };
      _this.mapCenter = new google.maps.LatLng(latitude, longitude);
      _this.mapOptions = {
        zoom: 17,
        center: _this.mapCenter,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      if (callback) callback(_this);
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ', ' + error;
      console.log('Request Failed (Location constructor): ' + err);
    });
  }

  Location.checkAvailability = function() {
    if (navigator.geolocation){
      return true;
    }
  };

  module.Location = Location;
})(window);
