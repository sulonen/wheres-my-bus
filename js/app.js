var output = $('#output');
var mapElement = $('#map').get(0);
var stop = {};
var test = {};

if (!Location.checkAvailability) {
  output.html('<p>Geolocation is not supported by your browser</p>');
} else {
  output.html('<p>Locating…</p>');
}

function success(position) {
  var currentLocation = new Location(
    position.coords.latitude,
    position.coords.longitude
  );

  output.html('<p>Latitude: ' + currentLocation.latitude
    + '°<br>Longitude: ' + currentLocation.longitude + '°</p>');

  var map = new google.maps.Map(mapElement, currentLocation.mapOptions);

  var marker = new google.maps.Marker({
    map: map,
    position: currentLocation.position,
    title: 'Your location',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });

  stops = new Stops(currentLocation.latitude, currentLocation.longitude);

  // test ID provided for getArrivals testing
  stops.stopID = '1_26610';
  Stops.getStopData(stops, renderList);
  Stops.getArrivals(stops, testArrivals);
}

function renderList() {
  var stopsRaw = stops.stopsData.data.list;
  var stopsList = stopsRaw.map(function(element) {
    return element.id
    + ' (' + element.direction + '): '
    + element.name;
  });
  stopsList.forEach(function(element) {
    $('#stops').append('<li><a href=\"#\">' + element + '</a></li>');
  });
}

function testArrivals() {
  console.log(stops.arrivalsData.data.entry.arrivalsAndDepartures);
}

function error() {
  output.html = '<p>Unable to retrieve your location</p>';
};

navigator.geolocation.getCurrentPosition(success, error);
