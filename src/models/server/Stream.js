"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stream = /** @class */ (function () {
    function Stream(id) {
        this.observers = new Set();
        this.id = id;
    }
    Stream.prototype.getId = function () {
        return this.id;
    };
    Stream.prototype.addObserver = function (observer) {
        this.observers.add(observer);
    };
    Stream.prototype.removeObserver = function (observer) {
        this.observers.delete(observer);
    };
    Stream.prototype.notifyObservers = function (message) {
        var e_1, _a;
        try {
            for (var _b = __values(this.observers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                observer.update(message);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return Stream;
}());
exports.default = Stream;
