var output = $('#output');
var mapElement = $('#map').get(0);
var stop = {};

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

  stop = new Stop(currentLocation.latitude, currentLocation.longitude);

  // test ID provided for getArrivals testing
  stop.stopID = '1_26698';
  Stop.getStopData(stop, renderList);
  Stop.getArrivals(stop, testArrivals);
}

function renderList() {
  var stopsRaw = stop.stopsData.data.list;
  var stopsList = stopsRaw.map(function(element) {
    return element.id
    + ' (' + element.direction + '): '
    + element.name;
  });
  console.log(stopsList);
  stopsList.forEach(function(element) {
    $('#stops').append('<li><a href=\"#\">' + element + '</a></li>');
  });
}

function testArrivals() {
  console.log(stop.arrivalsData);
}

function error() {
  output.html = '<p>Unable to retrieve your location</p>';
};

navigator.geolocation.getCurrentPosition(success, error);
Status API Training Shop Blog About Pricing
© 2016 GitHub, Inc. Terms Privacy Security Contact Help
