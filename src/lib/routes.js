"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller"); //importamos el archivo de controller
class Routes {
    constructor(app, socket) {
        this.app = app;
        this.socket = socket;
    }
    appRoutes() {
        this.app.get("/", (req, res) => res.status(200).send("El servicor ya esta corriendo"));
        this.app.get("/v1/user/:id", controller_1.getUser); //La funcion getUser no la va a reconocer hasta que se importe de controller las mismas
        this.app.get("/v1/user/", controller_1.listUser);
        this.app.post("/v1/user/", controller_1.postUser);
        this.app.put("/v1/user/:id", controller_1.putUser);
        this.app.delete("/v1/user/:id", controller_1.deleteUser);
    }
    routesConfig() {
        this.appRoutes();
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map