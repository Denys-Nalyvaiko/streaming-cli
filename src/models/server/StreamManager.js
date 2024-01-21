"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream_1 = require("./Stream");
var StreamManager = /** @class */ (function () {
    function StreamManager() {
        this.streams = new Map();
    }
    StreamManager.getInstance = function () {
        if (!StreamManager.instance) {
            StreamManager.instance = new StreamManager();
        }
        return StreamManager.instance;
    };
    StreamManager.prototype.createStream = function () {
        var streamId = Math.random().toString(36).substring(7);
        var stream = new Stream_1.default(streamId);
        this.streams.set(streamId, stream);
        return stream;
    };
    StreamManager.prototype.getStreamById = function (id) {
        return this.streams.get(id);
    };
    StreamManager.prototype.removeStreamById = function (id) {
        this.streams.delete(id);
    };
    return StreamManager;
}());
exports.default = StreamManager;
