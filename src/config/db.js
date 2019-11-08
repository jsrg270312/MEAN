"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Connect {
    constructor(url) {
        this.url = url;
    }
    connection() {
        mongoose_1.default.connect(`${this.url}`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((e) => {
            mongoose_1.default.Promise = global.Promise;
            console.log("connection a Mongo gut");
        })
            .catch((e) => {
            console.log("error en mongo");
            console.log(e.name);
        });
    }
}
exports.default = Connect;
//# sourceMappingURL=db.js.map