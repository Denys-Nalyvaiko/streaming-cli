"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Streamer = /** @class */ (function () {
    function Streamer(io, stream) {
        var _this = this;
        this.io = io;
        this.stream = stream;
        this.stream.addObserver(this);
        this.io.on("connection", function (socket) {
            console.log("New viewer connected: ".concat(socket.id));
            socket.join(_this.stream.getId());
            socket.on("disconnect", function () {
                console.log("Viewer disconnected: ".concat(socket.id));
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
