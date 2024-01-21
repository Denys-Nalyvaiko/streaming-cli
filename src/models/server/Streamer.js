"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamManager_1 = require("./StreamManager");
var Streamer = /** @class */ (function () {
    function Streamer(io, stream) {
        var _this = this;
        this.io = io;
        this.stream = stream;
        this.stream.addObserver(this);
        this.io.on("connection", function (socket) {
            // console.log(`New viewer connected: ${socket.id}`);
            // socket.join(this.stream.getId());
            socket.on("disconnect", function () {
                console.log("Viewer disconnected: ".concat(socket.id));
            });
            socket.on("join", function (streamId) {
                var requestedStream = StreamManager_1.default.getInstance().getStreamById(streamId);
                if (requestedStream) {
                    socket.join(requestedStream.getId());
                    console.log("Viewer ".concat(socket.id, " joined stream ").concat(requestedStream.getId()));
                }
                else {
                    console.log("Stream with ID ".concat(streamId, " not found."));
                }
            });
            socket.on("message", function (message) {
                console.log("[Viewer] Message from ".concat(socket.id, ": ").concat(message));
                _this.stream.notifyObservers("[Viewer] ".concat(socket.id, ": ").concat(message));
            });
        });
    }
    Streamer.prototype.update = function (message) {
        this.io.to(this.stream.getId()).emit("message", message);
    };
    return Streamer;
}());
exports.default = Streamer;
