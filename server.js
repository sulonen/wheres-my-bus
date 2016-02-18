var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  api_key = process.env.ONEBUS_KEY,
  app = express();

var proxyOneBusAway = function(request, response) {
  console.log('Routing OneBusAway request for', request.params[0]);
  (requestProxy({
    url: 'http://api.pugetsound.onebusaway.org/api/' + request.params[0],
  }))(request, response);
};

app.get('/oneBusAway/*', proxyOneBusAway);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
