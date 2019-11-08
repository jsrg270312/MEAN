"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        reqired: [true, "email requerido"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        reqired: [true, "email requerido"],
    },
    userType: {
        type: String,
        enum: ["admin", "photo", "user"],
        reqired: true,
        default: "user"
    },
    createdAt: {
        type: Number,
        reqired: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Number,
        reqired: true,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        reqired: true,
        default: false
    }
});
userSchema.plugin(mongoose_unique_validator_1.default, { message: "Ya existe " });
userSchema.pre("save", function (next) {
    let _this = this;
    if (_this.password) {
        bcrypt_1.default.hash(_this.password, 10, (err, hash) => {
            if (err)
                return next(err);
            else {
                _this.password = hash;
                next();
            }
        });
    }
    else
        next();
});
exports.default = mongoose_1.default.model("Users", userSchema);
//# sourceMappingURL=users.js.map