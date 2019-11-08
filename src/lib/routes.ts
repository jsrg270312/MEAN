import { Server as Main } from "./../interfaces"
import {Request, Response } from "express"
import{ getUser, listUser, postUser, deleteUser, putUser } from "./controller" //importamos el archivo de controller

export default class Routes{

    constructor(private app: Main["app"], private socket: Main["socket"]) {}

    appRoutes(){
        this.app.get("/", (req: Request, res: Response) => res.status(200).send("El servicor ya esta corriendo") )

        this.app.get("/v1/user/:id", getUser) //La funcion getUser no la va a reconocer hasta que se importe de controller las mismas
        this.app.get("/v1/user/", listUser)
        this.app.post("/v1/user/", postUser)
        this.app.put("/v1/user/:id", putUser)
        this.app.delete("/v1/user/:id", deleteUser)
    }

    
    routesConfig() {
        this.appRoutes()
    }
}
