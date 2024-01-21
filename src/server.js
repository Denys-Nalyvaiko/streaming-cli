"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var Streamer_1 = require("./models/server/Streamer");
var StreamManager_1 = require("./models/server/StreamManager");
var PORT = 3000;
var app = express();
var server = http.createServer(app);
var io = new socketIo.Server(server);
app.get("/", function (req, res) {
    res.send("Server is running.");
});
var streamManager = StreamManager_1.default.getInstance();
app.get("/start", function (req, res) {
    var stream = streamManager.createStream();
    new Streamer_1.default(io, stream);
    res.send("Stream started with ID: ".concat(stream.getId()));
});
server.listen(PORT, function () {
    console.log("Server is running on port", PORT);
});
