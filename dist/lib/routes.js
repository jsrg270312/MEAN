"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller"); //importamos el archivo de controller
var Routes = /** @class */ (function () {
    function Routes(app, socket) {
        this.app = app;
        this.socket = socket;
    }
    Routes.prototype.appRoutes = function () {
        this.app.get("/", function (req, res) { return res.status(200).send("El servicor ya esta corriendo"); });
        this.app.get("/v1/user/:id", controller_1.getUser); //La funcion getUser no la va a reconocer hasta que se importe de controller las mismas
        this.app.get("/v1/user/", controller_1.listUser);
        this.app.post("/v1/user/", controller_1.postUser);
        this.app.post("/v1/user/:id/login", controller_1.login);
        this.app.put("/v1/user/:id", controller_1.putUser);
        this.app.delete("/v1/user/:id", controller_1.deleteUser);
    };
    Routes.prototype.routesConfig = function () {
        this.appRoutes();
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map