(function(module) {
  function Stop(stopID) {
    var _this = this;
    this.stopID = stopID;
    $.get('/oneBusAway/where/stop/'
          + stopID
          + '.jsonTEST')
    .done(function(data, message, xhr) {
      _this.stopsData = JSON.parse(data);
      _this.latitude = _this.stopsData.data.entry.lat;
      _this.longitude = _this.stopsData.data.entry.lon;
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ', ' + error;
      console.log('Request Failed: ' + err);
    });
  }

  Stop.getArrivals = function(stop, callback) {
    var url = '/oneBusAway/where/arrivals-and-departures-for-stop/'
              + stop.stopID
              + '.jsonTEST';
    $.get(url)
    .done(function(data, message, xhr) {
      stop.arrivalsData = JSON.parse(data);
      stop.arrivalsList = stop.arrivalsData.data.entry.arrivalsAndDepartures;
      if (callback) callback();
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ', ' + error;
      console.log('Request Failed: ' + err);
    });
  };

  module.Stop = Stop;
})(window);
