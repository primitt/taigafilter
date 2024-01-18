var express = require("express");
var utils = require("./utils.js");
var headers = require("./headers.js");
var xml = require("xml-js");
var app = express();

app.get("/", function(req, res) {
    res.send("Hello World");
});

app.get("/rss", async function(req, res) {
    res.set("Content-Type", "text/xml");
    res.send(xml.js2xml(headers.rehd(await utils.filter("https://subsplease.org/rss/?t&r=1080")), { compact: true, spaces: 4 }));
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
    console.log("Headers: \n" + headers.headers)
});