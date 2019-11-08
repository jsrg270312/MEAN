"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//import  Usuario from "./clases/usuario"
var clases_1 = require("./clases/");
var getUser = function (req, res) {
    var usuario = new clases_1.Usuario(req.body);
    usuario.Get(mongoose_1.Types.ObjectId(req.params.id))
        .then(function (u) {
        var response = new clases_1.Response(u, req.method);
        res.status(response.getStatusCode()).json(response.data());
    })
        .catch(function (e) {
        console.log("catch");
        var response = new clases_1.Response(null, req.method, e.errors);
        res.status(500).json(response.data());
    });
};
exports.getUser = getUser;
var listUser = function (req, res) {
    var usuario = new clases_1.Usuario(req.body);
    usuario.Get()
        .then(function (u) {
        var response = new clases_1.Response(u, req.method);
        res.status(response.getStatusCode()).json(response.data());
    })
        .catch(function (e) {
        console.log("catch");
        var response = new clases_1.Response(null, req.method, e.errors);
        res.status(500).json(response.data());
    });
};
exports.listUser = listUser;
var postUser = function (req, res) {
    var usuario = new clases_1.Usuario(req.body);
    usuario.Post()
        .then(function (u) {
        if (u && u._id) {
            var response = new clases_1.Response(u, req.method);
            res.status(response.getStatusCode()).json(response.data());
        }
    })
        .catch(function (e) {
        console.log("catch");
        var response = new clases_1.Response(null, req.method, e);
        res.status(response.getStatusCode()).json(response.data());
    });
};
exports.postUser = postUser;
var putUser = function (req, res) {
    var usuario = new clases_1.Usuario(req.body);
    usuario.Put(mongoose_1.Types.ObjectId(req.params.id))
        .then(function (u) {
        if (u && u._id) {
            var response = new clases_1.Response(u, req.method);
            res.status(response.getStatusCode()).json(response.data());
        }
    })
        .catch(function (e) {
        console.log("catch");
        var response = new clases_1.Response(null, req.method, e);
        res.status(response.getStatusCode()).json(response.data());
    });
};
exports.putUser = putUser;
var deleteUser = function (req, res) {
    var usuario = new clases_1.Usuario(req.body);
    usuario.Delete(mongoose_1.Types.ObjectId(req.params.id))
        .then(function (u) { console.log(u), res.status(200).json({ "message": "Usuario eliminado" }); })
        .catch(function (e) { return res.status(200).json({ code: 500, "message": e.errors }); });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=controller.js.map