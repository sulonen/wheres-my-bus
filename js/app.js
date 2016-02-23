var output = $('#output');
var mapElement = $('#map').get(0);
var currentLocation = {};

if (!Location.checkAvailability) {
  output.html('<p>Geolocation is not supported by your browser</p>');
} else {
  output.html('<p>Locating…</p>');
}

function success(position) {
  currentLocation = new Location(
    position.coords.latitude,
    position.coords.longitude
  );

  Location.getStops(currentLocation, console.log(currentLocation));

  output.html('<p>Latitude: ' + currentLocation.latitude
    + '°<br>Longitude: ' + currentLocation.longitude + '°</p>');

  var plotLocation = new google.maps.Map(mapElement, currentLocation.mapOptions);

  var marker = new google.maps.Marker({
    map: plotLocation,
    position: currentLocation.position,
    title: 'Your location',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });

  stop = new Stop('1_26610');
  Stop.getArrivals(stop, testArrivals);
}

function error() {
  output.html = '<p>Unable to retrieve your location</p>';
}

// function renderList(location) {
//   var rawStops = location.stopsList;
//   var stopsForLocation = rawStops.map(function(element) {
//     return element.id
//     + ' (' + element.direction + '): '
//     + element.name;
//   });
//   stopsForLocation.forEach(function(element) {
//     $('#stops').append('<li><a href=\"#\">' + element + '</a></li>');
//   });
// }

function testArrivals() {
  console.log('Test arrivals:');
  console.log(stop.arrivalsList);
}

navigator.geolocation.getCurrentPosition(success, error);


// http://localhost:3000/oneBusAway/where/stops-for-location.jsonTEST&lat=47.6232869&lon=-122.3359755&radius=200
