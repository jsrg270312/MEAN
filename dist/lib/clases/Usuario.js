"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./../../models/");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Usuario = /** @class */ (function () {
    //private body: IUsuario
    function Usuario(body) {
        var email = body.email, password = body.password, userType = body.userType;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.body = body;
    }
    Usuario.prototype.Save = function (data) {
        var user = new models_1.Users(data);
        return new Promise(function (resolver, reject) {
            user.save(function (err, u) { return (err) ? reject(err) : resolver(u); });
        });
    };
    Usuario.prototype.Get = function (id) {
        var criteria = (id)
            ? (typeof id === "string")
                ? { "email": id }
                : { "id": id }
            : {};
        //const criteria = (id) ? {_id: id}: {}
        return models_1.Users.find(criteria)
            .then(function (u) { return (id && u.length < 1) ? {} : (id && u[0]._id) ? u[0] : u; })
            .catch((function (e) { return e; }));
    };
    Usuario.prototype.Post = function () {
        var _this = this;
        var data = {
            email: this.email,
            password: this.password,
            userType: this.userType
        };
        return new Promise(function (resolve, reject) {
            _this.Save(data)
                .then(function (user) { return resolve(user); })
                .catch(function (error) { return reject(error); });
        });
    };
    Usuario.prototype.Put = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Get(id)
                .then(function (user) {
                user.email = _this.email || user.email;
                user.password = _this.password || user.password;
                if (_this.password)
                    user.password = _this.password;
                _this.Save(user)
                    .then(function (newUser) { return (newUser && newUser._id) ? resolve(newUser) : reject({}); })
                    .catch(function (e) { return reject(e); });
            });
        });
    };
    Usuario.prototype.Delete = function (id) {
        var criteria = (id) ? { _id: id } : {};
        return models_1.Users.remove(criteria)
            .then(function (user) { return user; })
            .catch(function (e) { return e; });
    };
    //checkPassword(prev: String){
    // return (bcrypt.compareSync(this.password, prev))  
    //}
    Usuario.prototype.login = function (value) {
        var _this = this;
        return this.Get(value)
            .then(function (user) {
            console.log("Usuario es ", user);
            if (user && user._id) {
                return (bcrypt_1.default.compareSync(_this.password, user.password));
            }
        })
            .catch(function (error) { return console.log("Errores ", error); });
    };
    return Usuario;
}());
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map