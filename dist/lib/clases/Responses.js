"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response = /** @class */ (function () {
    function Response(mascota, method, errors) {
        this.mascota = mascota;
        this.method = method;
        this.error = (!this.mascota && errors) ? true : false;
        this.errors = (errors) ? errors : null;
        this.statusCode = this.setCode();
    }
    Response.prototype.getStatusCode = function () {
        return this.statusCode;
    };
    Response.prototype.data = function () {
        return {
            code: this.statusCode,
            error: this.error,
            data: this.mascota,
            message: this.message()
        };
    };
    Response.prototype.message = function () {
        if (this.errors)
            return this.errors;
        else
            return (this.method === "POST")
                ? this.postMessage()
                : (this.method === "GET")
                    ? this.getMessage()
                    : (this.method === "PUT")
                        ? this.putMessage()
                        : this.deleteMessage();
    };
    Response.prototype.postMessage = function () {
        return (this.statusCode === 201)
            ? "El objeto es correcto"
            : "hubo un error";
    };
    Response.prototype.getMessage = function () {
        return (Array.isArray(this.mascota))
            ? "mascotas obtenixas exitosamente"
            : (this.statusCode != 404)
                ? "mascota obtenida exitosamente"
                : "no se ha encontrado la mascota";
    };
    Response.prototype.putMessage = function () {
        return (this.statusCode === 200) ? "modificado correctamente" : "hubo un error al modificar";
    };
    Response.prototype.deleteMessage = function () {
        return (this.statusCode === 200) ? "modificado correctamente" : "hubo un error al modificar";
    };
    Response.prototype.setCode = function () {
        return (this.method === "GET")
            ? this.getCode()
            : (this.method === "POST")
                ? this.postCode()
                : (this.method === "PUT")
                    ? this.putCode()
                    : (this.method === "DELETE")
                        ? this.deleteCode()
                        : 405;
    };
    Response.prototype.getCode = function () {
        return ((Array.isArray(this.mascota) || (this.mascota && Object.entries(this.mascota).length >= 1)) && (!this.error))
            ? 200
            : (this.mascota && Object.entries(this.mascota).length < 1 && !this.error)
                ? 404
                : 500;
    };
    Response.prototype.postCode = function () {
        return (this.mascota && this.error === false)
            ? 201
            : 409;
    };
    Response.prototype.putCode = function () {
        return (this.mascota && this.error === false)
            ? 200
            : 409;
    };
    Response.prototype.deleteCode = function () {
        return (this.error)
            ? 500
            : (!this.error && !this.mascota)
                ? 404
                : 200;
    };
    return Response;
}());
exports.default = Response;
//# sourceMappingURL=Responses.js.map