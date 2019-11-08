"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const routes_1 = __importDefault(require("./lib/routes"));
const config_1 = require("./config/");
const app = express_1.default();
const server = new http_1.default.Server(app);
const host = "localhost";
const main = {
    port: process.env.PORT || 8080,
    app, server, host,
    socket: socket_io_1.default(server)
};
class Server {
    constructor(main) {
        this.main = main;
    }
    appConfig() {
        this.main.app.use(body_parser_1.default.json());
        this.main.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    includeRoutes() {
        new routes_1.default(this.main.app, this.main.socket).routesConfig();
    }
    initDB() {
        new config_1.Connect("mongodb+srv://sebastianReyes:sebastianReyes@cluster0-dq7zr.mongodb.net/test?retryWrites=true&w=majority").connection();
    }

    appExecute() {
        this.appConfig();
        this.includeRoutes();
        this.initDB();
        const onListening = () => console.log(`conexion establecida por el puerto ${this.main.port}`);
        this.main.server.listen(this.main.port, onListening);
    }
}
const start = new Server(main);
start.appExecute();
//# sourceMappingURL=app.js.map