import { Usuario as IUsuario } from "./../../interfaces/"
import mongoose , {Types} from "mongoose"
import {Users as MUsers} from "./../../models/"
import { promises } from "fs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {variables} from "./../../config/index"

interface IUserInput {
  email: IUsuario["email"],
  password: IUsuario["password"],
  userType: IUsuario["userType"]
}

export default class Usuario {

    private email: string
    private password: string
    private userType: string
    private body : IUsuario
    
    //private body: IUsuario
    
    constructor(body: IUsuario){
        const {email, password, userType} = body
        this.email = email
        this.password = password
        this.userType = userType
        this.body = body
    }
    Save(data: IUserInput): Promise < IUsuario | Error[]> {
      const user = new MUsers(data)
      return new Promise ((resolver, reject) => {
        user.save((err, u: IUsuario) => (err)? reject(err) : resolver(u))
      })
    }

    Get(id?: Types.ObjectId | string) {
      const criteria = (id)
                        ?(typeof id === "string") 
                            ? {"email": id}
                            : {"id": id}
                        :{}
      //const criteria = (id) ? {_id: id}: {}
      return MUsers.find(criteria)
      .then(u => (id && u.length < 1) ? {} : (id && u[0]._id) ? u[0] : u)
      .catch((e => e))
      
    }
    
    Post(): Promise<IUsuario | Error[]> {
      const data: IUserInput = {
        email: this.email,
        password: this.password,
        userType: this.userType
      }
      return new Promise((resolve, reject) => {
        this.Save(data)
          .then((user) => resolve(user))
          .catch((error: Error[]) => reject(error))
      })
    }

    Put(id: Types.ObjectId): Promise <IUsuario | Error[]> {
      return new Promise((resolve, reject) => {
        this.Get(id)
          .then((user: any) => {
            user.email = this.email || user.email
            user.password = this.password || user.password
            if(this.password) user.password = this.password
            this.Save(user)
            .then((newUser:any) => (newUser && newUser._id)? resolve(newUser): reject({}))
            .catch(e => reject(e))
          })
      })
    }
    Delete(id: Types.ObjectId) {
      const criteria = (id) ? {_id: id}: {}
      return MUsers.remove(criteria)
      .then(user => user)
      .catch(e => e)
    }

    //checkPassword(prev: String){
     // return (bcrypt.compareSync(this.password, prev))  
    //}

    Login(value: Types.ObjectId | string){
      return this.Get(value)
        .then((user:IUsuario) => {
          if(user && user._id && bcrypt.compareSync(this.password, user.password)) {
            console.log(typeof(user), "este es el typeof");
            
            //let newUser = user.toJSON()
            const token= this.generateJWT(user)
            return {user, token}
          
          }else return {}
        })
        .catch((error:Error[]) => console.log("Errores ", error))
    }

    generateJWT(user: IUsuario){
      const token = jwt.sign({user : user}, variables.secretKey, {expiresIn: 600000})
      return token
    }

}