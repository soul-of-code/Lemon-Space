const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
var options = {
    key: fs.readFileSync('./key/2_myblog.city.key'),
    cert: fs.readFileSync('./key/1_myblog.city_bundle.crt')
}
var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);
app.use('/static/', express.static('./build/static/'))
app.get('/font.js', function (req, res) {
    res.sendFile(path.resolve('./public/font.js'))
})
app.get('/jquery-3.3.1.min.js', function (req, res) {
    res.sendFile(path.resolve('./public/jquery-3.3.1.min.js'))
})
app.get('/favicon1.ico', function (req, res) {
    res.sendFile(path.resolve('./public/favicon1.ico'))
})
app.get('/loading.css', function (req, res) {
    res.sendFile(path.resolve('./public/loading.css'))
})
app.get('/background.js', function (req, res) {
    res.sendFile(path.resolve('./public/background.js'))
})
app.get('*', function (req, res) {
    res.sendFile(path.resolve('./build/index.html'))
})
httpsServer.listen(443)
httpServer.listen(80)