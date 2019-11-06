import { Request, Response }  from "express"
import  Usuario from "./clases/usuario"
import { Usuario as IUsuario } from "./../interfaces"

const getUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    res.status(200).send("Hola")
}
const listUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    res.status(200).send("Hola")
}
const postUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    res.status(200).send("Hola")
}
const putUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    res.status(200).send("Hola")
}
const deleteUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    res.status(200).send("Hola")
}

export {
    getUser,
    listUser,
    postUser,
    putUser,
    deleteUser
}