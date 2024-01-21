"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var Viewer_1 = require("./models/client/Viewer");
var socket = io.connect("http://localhost:3000");
var viewer = new Viewer_1.default(socket);
