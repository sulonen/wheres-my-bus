
function geoFindMe() {
  var output = $('#output');

  if (!navigator.geolocation){
    output.html('<p>Geolocation is not supported by your browser</p>');
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var stopsData = {};

    output.html('<p>Latitude: ' + latitude
      + '° <br>Longitude: ' + longitude + '°</p>');

    var position = {lat: latitude, lng: longitude};
    var mapCenter  = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 17,
        center: mapCenter,
        mapTypeId : google.maps.MapTypeId.ROADMAP };

    var mapElement = $("#map").get(0);
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title:"Your location"
    });

    $.get('/oneBusAway/where/stops-for-location.json?key=TEST'
      + '&lat=' + latitude
      + '&lon=' + longitude
      + '&radius=100')
    .done(function(data, message, xhr) {
      stopsData = data;
    })
    .done(function() {
      $('#stops').append(JSON.stringify(stopsData, null, 2));
    })
  };

  function error() {
    output.innerHTML = 'Unable to retrieve your location';
  };

  output.html('<p id="message">Locating…</p>');

  navigator.geolocation.getCurrentPosition(success, error);
}


$('.myLocation').on('click', geoFindMe);
