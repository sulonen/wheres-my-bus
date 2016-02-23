var output = $('#output');
var mapElement = $('#map').get(0);
var currentLocation;
var plotLocation;
var stop = {};

if (!Location.checkAvailability) {
  output.html('<p>Geolocation is not supported by your browser</p>');
} else {
  output.html('<p>Locating…</p>');
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  currentLocation = new Location(
    position.coords.latitude,
    position.coords.longitude,
    plot
  );
}

function error() {
  output.html = '<p>Unable to retrieve your location</p>';
}

var plot = function(location) {
  output.html('<p>Latitude: ' + location.latitude
    + '°<br>Longitude: ' + location.longitude + '°</p>');

  plotLocation = new google.maps.Map(mapElement, location.mapOptions);

  var marker = new google.maps.Marker({
    map: plotLocation,
    id: 'Your location',
    position: location.position,
    title: 'Your location',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });

  marker.addListener('click', function() {
    plotLocation.setCenter(marker.getPosition());
  });

  renderList(location);
};

function renderList(location) {
  var stopsForLocation = location.stopsList.map(function(element) {
    element.position = {lat: element.lat, lng: element.lon};

    var marker = new google.maps.Marker({
      map: plotLocation,
      id: element.id,
      position: element.position,
      title: '(' + element.direction + ') '
             + element.name,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    marker.addListener('click', function() {
      plotLocation.setCenter(marker.getPosition());
      stop = new Stop(marker.id);
      Stop.getArrivals(stop, renderArrivalsList);
    });
  });
}

function renderArrivalsList() {
  $('#location').hide();

  stop.arrivalsList.forEach(function(element) {
    console.log(element);
    var millisecondsAway = new Date(Date.now() - element.scheduledArrivalTime);
    var minutesAway = millisecondsAway.getMinutes();
    var arrivalEntry = '<li lat=\"' + element.tripStatus.lastKnownLocation.lat + '\"'
                       + ' lon=\"' + element.tripStatus.lastKnownLocation.lon + '\">'
                       + element.routeShortName
                       + '  ' + element.tripHeadsign
                       + '  <b>' + minutesAway + '</b></li>'
    $('#arrivals > ul').append(arrivalEntry);
  });
}

function testArrivals() {
  console.log('Test arrivals:');
  console.log(stop.arrivalsList);
}

function combare(a, b) {
  return a - b;
}



// http://localhost:3000/oneBusAway/where/stops-for-location.jsonTEST&lat=47.6232869&lon=-122.3359755&radius=200
