import { Request, Response }  from "express"
import { Types } from "mongoose"
//import  Usuario from "./clases/usuario"
import { Usuario , Response as R} from "./clases/"
import { Usuario as IUsuario } from "./../interfaces"

const getUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    
    usuario.Get(Types.ObjectId(req.params.id))
    .then((u) => {
        const response = new R(u, req.method)
        res.status(response.getStatusCode()).json(response.data())
    })
    .catch((e: any) => {
        console.log("catch")
        const response = new R(null, req.method, e.errors)
        res.status(500).json(response.data())
    })
}
const listUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    usuario.Get()
    .then((u) => {
        const response = new R(u, req.method)
        res.status(response.getStatusCode()).json(response.data())
    })
    .catch((e: any) => {
        console.log("catch")
        const response = new R(null, req.method, e.errors)
        res.status(500).json(response.data())
    })
}
const postUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)

    usuario.Post()
        .then((u: any) => {
            if(u && u._id){
                
                const response = new R (u, req.method)
                res.status(response.getStatusCode()).json(response.data())
            }
        })
        .catch((e: any) => {
            console.log("catch")
            const response = new R(null, req.method, e)
            res.status(response.getStatusCode()).json(response.data())
        })
}
const putUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    usuario.Put(Types.ObjectId(req.params.id))
    .then((u: any) => {
        if(u && u._id){
            const response = new R (u, req.method)
            res.status(response.getStatusCode()).json(response.data())
        }
    })
    .catch((e: any) => {
        console.log("catch")
        const response = new R(null, req.method, e)
        res.status(response.getStatusCode()).json(response.data())
    })

}
const deleteUser = (req: Request, res: Response): void => {
    const usuario = new Usuario(req.body)
    usuario.Delete(Types.ObjectId(req.params.id))
    .then(u =>  {console.log(u),res.status(200).json({"message":"Usuario eliminado"})})
    .catch((e: any ) => res.status(200).json({code:500,"message":e.errors}))

}

export {
    getUser,
    listUser,
    postUser,
    putUser,
    deleteUser
}