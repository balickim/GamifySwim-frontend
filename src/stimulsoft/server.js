var express = require('express');
var app = express();

app.use("/", express.static(__dirname + '/'));
app.use("/reports", express.static(__dirname + '/reports'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.listen(8080);