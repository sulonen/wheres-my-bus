var message = $('#message');
var mapElement = $('#map').get(0);
var currentLocation;
var plotLocation = {};
var stopMarkers = [];

if (!Location.checkAvailability) {
  error();
} else {
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
  message.html = '<p>Unable to retrieve your location</p>';
}

var plot = function(location) {
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

  renderStopsList(location);
};

function renderStopsList(location) {
  var test = location.stopsList.map(function(element) {
    element.position = {lat: element.lat, lng: element.lon};

    var marker = new google.maps.Marker({
      map: plotLocation,
      id: element.id,
      position: element.position,
      title: '(' + element.direction + ') '
             + element.name,
      icon: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png'
    });

    marker.addListener('click', function() {
      $('#arrivalsModal').modal('show');
      var stop = new Stop(marker.id);
      Stop.getArrivals(stop, renderArrivalsList);
    });

    stopMarkers.push(marker);
  });
}

function renderArrivalsList(stop) {
  //$('#location').hide();
  $('#arrivalsTable tbody').empty();
  $('#arrivalsModal').modal('show');

  stop.arrivalsList.forEach(function(element) {
    var millisecondsAway = new Date(Date.now() - element.scheduledArrivalTime);
    var minutesAway = millisecondsAway.getMinutes();
    var tripLat = function() {
      if (element.tripStatus.lastKnownLocation) {
        return element.tripStatus.lastKnownLocation.lat;
      } else {
        return 'unavailable';
      }
    };
    var tripLon = function() {
      if (element.tripStatus.lastKnownLocation) {
        return element.tripStatus.lastKnownLocation.lon;
      } else {
        return 'unavailable';
      }
    };
    var arrivalEntry = '<tr><td>' + element.routeShortName + '</td>'
                       +'<td lat=\"' + tripLat() + '\"'
                       + ' lon=\"' + tripLon() + '\">'
                       + '<a href=\"#\">' + element.tripHeadsign
                       + '</a></td><td>' + minutesAway + '</td>';

    $('#arrivalsTable tbody').append(arrivalEntry);
  });

  $('#arrivalsTable td').on('click', function(event) {
    event.preventDefault();
    clearStopMarkers();
    if ($(this).attr('lat') != 'unavailable') {
      var title = $(this).text() + '\nYour bus.';
      var latitude = parseFloat($(this).attr('lat')).toFixed(8);
      var longitude = parseFloat($(this).attr('lon')).toFixed(8);
      var position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };

      marker = new google.maps.Marker({
        map: plotLocation,
        position: position,
        title: title,
        icon: 'http://maps.google.com/mapfiles/ms/icons/bus.png'
      });

      marker.addListener('click', function() {
        plotLocation.setCenter(currentLocation.position);
      });

      plotLocation.setCenter(marker.getPosition());

      $('#arrivalsModal').modal('hide');
      //$('#arrivals').hide();
      $('#location').show();
    } else {
      console.log($(this).text());
      $(this).text('No location data is available for this arrival.');
    }
  });
}

$('#stopSearchBtn').on('click', function() {
  var stopSearchId = {stopID:'1_' + $('#stopId').val()};
  Stop.getArrivals(stopSearchId, renderArrivalsList);
});

function clearStopMarkers() {
  stopMarkers.forEach(function(marker) {
    marker.setMap(null);
  });
}
