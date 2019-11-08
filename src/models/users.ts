import mongoose, {Schema, Document}  from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import bcrypt from "bcrypt"
//import bcrypt from "bcrypt"

import {Usuario as IUsuario} from "./../interfaces"

const userSchema: Schema = new Schema({
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
        enum: ["admin", "photo","user"],
        reqired: true,
        default: "user"
    },
    createdAt:{
        type: Number,
        reqired: true,
        default: Date.now(),
    },
    updatedAt:{
        type: Number,
        reqired: true,
        default: Date.now(),
    },
    active:{
        type: Boolean,
        reqired: true,
        default: false
    }
})

userSchema.plugin(uniqueValidator, {message: "Ya existe "})

userSchema.pre("save", function(next){
    let _this: any = this
    if(_this.password){
        bcrypt.hash(_this.password, 10,(err, hash) =>{
            if(err)return next(err)
            else{
                _this.password = hash
                next()
            }
        })
    }else next()
    })

export default mongoose.model <IUsuario>("Users",userSchema )

