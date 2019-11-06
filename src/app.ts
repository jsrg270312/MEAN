import express from "express"
import bodyParser from "body-parser"
import http from "http"
import io from "socket.io"

import {Server as Main } from "./interfaces/"
import Routes from "./lib/routes"

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
    }
    includeRoutes(){
        new Routes(this.main.app, this.main.socket).routesConfig()
    }
    initDB(){

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