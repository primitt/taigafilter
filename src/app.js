var express = require("express");
var utils = require("./utils.js");
var xml = require("xml")
var app = express();

app.get("/", function(req, res) {
    res.send("Hello World");
});

app.get("/rss", async function(req, res) {
    res.set("Content-Type", "text/xml");
    res.send(xml(await utils.encode(await utils.decode("https://subsplease.org/rss/?t&r=1080"))));
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});