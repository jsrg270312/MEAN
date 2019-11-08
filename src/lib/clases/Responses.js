"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(mascota, method, errors) {
        this.mascota = mascota;
        this.method = method;
        this.error = (!this.mascota && errors) ? true : false;
        this.errors = (errors) ? errors : null;
        this.statusCode = this.setCode();
    }
    getStatusCode() {
        return this.statusCode;
    }
    data() {
        return {
            code: this.statusCode,
            error: this.error,
            data: this.mascota,
            message: this.message()
        };
    }
    message() {
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
    }
    postMessage() {
        return (this.statusCode === 201)
            ? "El objeto es correcto"
            : "hubo un error";
    }
    getMessage() {
        return (Array.isArray(this.mascota))
            ? "mascotas obtenixas exitosamente"
            : (this.statusCode != 404)
                ? "mascota obtenida exitosamente"
                : "no se ha encontrado la mascota";
    }
    putMessage() {
        return (this.statusCode === 200) ? "modificado correctamente" : "hubo un error al modificar";
    }
    deleteMessage() {
        return (this.statusCode === 200) ? "modificado correctamente" : "hubo un error al modificar";
    }
    setCode() {
        return (this.method === "GET")
            ? this.getCode()
            : (this.method === "POST")
                ? this.postCode()
                : (this.method === "PUT")
                    ? this.putCode()
                    : (this.method === "DELETE")
                        ? this.deleteCode()
                        : 405;
    }
    getCode() {
        return ((Array.isArray(this.mascota) || (this.mascota && Object.entries(this.mascota).length >= 1)) && (!this.error))
            ? 200
            : (this.mascota && Object.entries(this.mascota).length < 1 && !this.error)
                ? 404
                : 500;
    }
    postCode() {
        return (this.mascota && this.error === false)
            ? 201
            : 409;
    }
    putCode() {
        return (this.mascota && this.error === false)
            ? 200
            : 409;
    }
    deleteCode() {
        return (this.error)
            ? 500
            : (!this.error && !this.mascota)
                ? 404
                : 200;
    }
}
exports.default = Response;
//# sourceMappingURL=Responses.js.map