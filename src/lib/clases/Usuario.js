"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./../../models/");
class Usuario {
    //private body: IUsuario
    constructor(body) {
        const { email, password, userType } = body;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.body = body;
    }
    Save(data) {
        const user = new models_1.Users(data);
        return new Promise((resolver, reject) => {
            user.save((err, u) => (err) ? reject(err) : resolver(u));
        });
    }
    Get(id) {
        const criteria = (id) ? { _id: id } : {};
        return models_1.Users.find(criteria)
            .then(u => (id && u.length < 1) ? {} : (id && u[0]._id) ? u[0] : u)
            .catch((e => e));
    }
    Post() {
        const data = {
            email: this.email,
            password: this.password,
            userType: this.userType
        };
        return new Promise((resolve, reject) => {
            this.Save(data)
                .then((user) => resolve(user))
                .catch((error) => reject(error));
        });
    }
    Put(id) {
        return new Promise((resolve, reject) => {
            this.Get(id)
                .then((user) => {
                user.email = this.email || user.email;
                user.password = this.password || user.password;
                if (this.password)
                    user.password = this.password;
                this.Save(user)
                    .then((newUser) => (newUser && newUser._id) ? resolve(newUser) : reject({}))
                    .catch(e => reject(e));
            });
        });
    }
    Delete(id) {
        const criteria = (id) ? { _id: id } : {};
        return models_1.Users.remove(criteria)
            .then(user => user)
            .catch(e => e);
    }
}
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map