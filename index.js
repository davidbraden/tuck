var express = require('express');
var httpProxy = require('http-proxy');
var google = require('googleapis');

var homeUrl = "http://localhost:5000/"; //https://gentle-lake-3534.herokuapp.com
var oauth2Client = new google.auth.OAuth2(
    "716670020734-94tl1m9qs0ko80uuoh7angu5mqtci63i.apps.googleusercontent.com",
    "oqV63v8MSxiqvKyVaVfCU3Zu",
    homeUrl);

var app = express();
var proxy = httpProxy.createProxyServer();


app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));

app.all('/feeds/*', function(request, response) {
  proxy.web(request, response, { target: 'https://spreadsheets.google.com', changeOrigin:true});
});


app.get('/*', function(request, response) {
  if (request.query.code) {
    oauth2Client.getToken(request.query.code, function(err, tokens) {
      if(!err) {
        var model = {};
        model.token = tokens.access_token;
        response.render(__dirname + '/index.html', model);
      } else {
        console.log(err);
        response.redirect(url)
      }
    });
  } else {
    var url = oauth2Client.generateAuthUrl({
      access_type: 'online',
      scope: "https://spreadsheets.google.com/feeds"
    });
    response.redirect(url)
  }
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
