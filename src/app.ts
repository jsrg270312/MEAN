import express from "express"
import bodyParser from "body-parser"
import http from "http"
import io from "socket.io"
import cors from "cors"

import {Server as Main } from "./interfaces/"
import Routes from "./lib/routes"
import Connect from "./config/db"

const app = express()
const server = new http.Server(app)
const host = "localhost"

const main: Main = {
    port: process.env.PORT || 8080,
    app, server, host,
    socket: io(server)
}

class Server {
    constructor(private main: Main) {}

    appConfig() {
        this.main.app.use(bodyParser.json())
        this.main.app.use(bodyParser.urlencoded({ extended : true}))
        this.main.app.use(cors())
    }
    includeRoutes(){
        new Routes(this.main.app, this.main.socket).routesConfig()
    }
    initDB(){
        new Connect("mongodb+srv://sebastianReyes:sebastianReyes@cluster0-dq7zr.mongodb.net/test?retryWrites=true&w=majority").connection()
    }
    appExecute(){
        this.appConfig()
        this.includeRoutes()
        this.initDB()
        const onListening = () => console.log(`conexion establecida por el puerto ${ this.main.port}`)
        this.main.server.listen(this.main.port, onListening)
    }
}
const start = new Server(main)

start.appExecute()