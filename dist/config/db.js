"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Connect = /** @class */ (function () {
    function Connect(url) {
        this.url = url;
    }
    Connect.prototype.connection = function () {
        mongoose_1.default.connect("" + this.url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(function (e) {
            mongoose_1.default.Promise = global.Promise;
            console.log("connection a Mongo gut");
        })
            .catch(function (e) {
            console.log("error en mongo");
            console.log(e.name);
        });
    };
    return Connect;
}());
exports.default = Connect;
//# sourceMappingURL=db.js.map