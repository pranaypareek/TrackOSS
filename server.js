var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/html', express.static(__dirname + '/views'));

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + this.address().port);
});
