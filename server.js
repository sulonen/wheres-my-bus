var express = require('express'),
  superagent = require('superagent'),
  port = process.env.PORT || 3000,
  apiKey = process.env.ONEBUS_KEY || 'TEST',
  app = express();

function proxyRequest(request, response) {
  var url = 'http://api.pugetsound.onebusaway.org/api/'
    + request.params[0].replace('TEST', '?key=' + apiKey);

  superagent.get(url)
  .end(function(error, res) {
    console.log('Routed oneBusAway request for: ' + url);
    response.json(res.text);
  });
}

app.get('/oneBusAway/*', proxyRequest);

app.use(express.static('./public/'));

app.get('*', function(request, response) {
  console.log('New request: ', request.url);
  response.sendFile('public/index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
