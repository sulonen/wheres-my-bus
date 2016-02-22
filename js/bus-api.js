(function(module) {
  function Stops(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  };

  Stops.getStopData = function(stop, callback) {
    $.get('/oneBusAway/where/stops-for-location.jsonTEST'
          + '&lat=' + stop.latitude
          + '&lon=' + stop.longitude
          + '&radius=200')
      .done(function(data, message, xhr) {
        stop.stopsData = JSON.parse(data);
        stop.stopsList = stop.stopsData.data.list;
        if (callback) callback();
      })
      .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log('Request Failed: ' + err);
      });
  };

  Stops.getArrivals = function(stop, callback) {
    var url = '/oneBusAway/where/arrivals-and-departures-for-stop/'
              + stop.stopID
              + '.jsonTEST';
    $.getJSON(url,
      function(data, message, xhr) {
        stop.arrivalsData = JSON.parse(data);
        stop.arrivalsList = stop.arrivalsData.data.entry.arrivalsAndDepartures;
        if (callback) callback();
      });
  };

  module.Stops = Stops;
})(window);
