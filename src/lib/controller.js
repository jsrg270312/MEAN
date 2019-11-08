"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//import  Usuario from "./clases/usuario"
const clases_1 = require("./clases/");
const getUser = (req, res) => {
    const usuario = new clases_1.Usuario(req.body);
    usuario.Get(mongoose_1.Types.ObjectId(req.params.id))
        .then((u) => {
        const response = new clases_1.Response(u, req.method);
        res.status(response.getStatusCode()).json(response.data());
    })
        .catch((e) => {
        console.log("catch");
        const response = new clases_1.Response(null, req.method, e.errors);
        res.status(500).json(response.data());
    });
};
exports.getUser = getUser;
const listUser = (req, res) => {
    const usuario = new clases_1.Usuario(req.body);
    usuario.Get()
        .then((u) => {
        const response = new clases_1.Response(u, req.method);
        res.status(response.getStatusCode()).json(response.data());
    })
        .catch((e) => {
        console.log("catch");
        const response = new clases_1.Response(null, req.method, e.errors);
        res.status(500).json(response.data());
    });
};
exports.listUser = listUser;
const postUser = (req, res) => {
    const usuario = new clases_1.Usuario(req.body);
    usuario.Post()
        .then((u) => {
        if (u && u._id) {
            const response = new clases_1.Response(u, req.method);
            res.status(response.getStatusCode()).json(response.data());
        }
    })
        .catch((e) => {
        console.log("catch");
        const response = new clases_1.Response(null, req.method, e);
        res.status(response.getStatusCode()).json(response.data());
    });
};
exports.postUser = postUser;
const putUser = (req, res) => {
    const usuario = new clases_1.Usuario(req.body);
    usuario.Put(mongoose_1.Types.ObjectId(req.params.id))
        .then((u) => {
        if (u && u._id) {
            const response = new clases_1.Response(u, req.method);
            res.status(response.getStatusCode()).json(response.data());
        }
    })
        .catch((e) => {
        console.log("catch");
        const response = new clases_1.Response(null, req.method, e);
        res.status(response.getStatusCode()).json(response.data());
    });
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const usuario = new clases_1.Usuario(req.body);
    usuario.Delete(mongoose_1.Types.ObjectId(req.params.id))
        .then(u => { console.log(u), res.status(200).json({ "message": "Usuario eliminado" }); })
        .catch((e) => res.status(200).json({ code: 500, "message": e.errors }));
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=controller.js.map