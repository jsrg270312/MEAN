"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var routes_1 = __importDefault(require("./lib/routes"));
var config_1 = require("./config/");
var app = express_1.default();
var server = new http_1.default.Server(app);
var host = "localhost";
var main = {
    port: process.env.PORT || 8080,
    app: app, server: server, host: host,
    socket: socket_io_1.default(server)
};
var Server = /** @class */ (function () {
    function Server(main) {
        this.main = main;
    }
    Server.prototype.appConfig = function () {
        this.main.app.use(body_parser_1.default.json());
        this.main.app.use(body_parser_1.default.urlencoded({ extended: true }));
    };
    Server.prototype.includeRoutes = function () {
        new routes_1.default(this.main.app, this.main.socket).routesConfig();
    };
    Server.prototype.initDB = function () {
        new config_1.Connect("mongodb+srv://sebastianReyes:sebastianReyes@cluster0-dq7zr.mongodb.net/test?retryWrites=true&w=majority").connection();
    };
    Server.prototype.appExecute = function () {
        var _this = this;
        this.appConfig();
        this.includeRoutes();
        this.initDB();
        var onListening = function () { return console.log("conexion establecida por el puerto " + _this.main.port); };
        this.main.server.listen(this.main.port, onListening);
    };
    return Server;
}());
var start = new Server(main);
start.appExecute();
//# sourceMappingURL=app.js.map