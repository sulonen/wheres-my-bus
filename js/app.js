var output = $('#output');
var mapElement = $('#map').get(0);
var currentLocation;
var plotLocation;

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

  stop = new Stop('1_26610');
  Stop.getArrivals(stop, testArrivals);
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
    position: location.position,
    title: 'Your location',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });

  renderList(location);
};

function renderList(location) {
  console.log(plotLocation);
  var stopsForLocation = location.stopsList.map(function(element) {
    element.position = {lat: element.lat, lng: element.lon};
    console.log(element);
    new google.maps.Marker({
      map: plotLocation,
      position: element.position,
      title: '(' + element.direction + ') '
             + element.name,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    return element.id
    + ' (' + element.direction + '): '
    + element.name;
  });
  stopsForLocation.forEach(function(element) {
    $('#stops').append('<li><a href=\"#\">' + element + '</a></li>');
  });
}

function testArrivals() {
  console.log('Test arrivals:');
  console.log(stop.arrivalsList);
}



// http://localhost:3000/oneBusAway/where/stops-for-location.jsonTEST&lat=47.6232869&lon=-122.3359755&radius=200
