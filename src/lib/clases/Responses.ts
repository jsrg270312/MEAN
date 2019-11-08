import { Usuario as IUsuario, UsuarioResponse, Error} from "./../../interfaces"

export default class Response{

    private mascota: IUsuario | IUsuario[] | null | {}
    private method: string
    private errors: Error[] | any | null
    private error: boolean
    private statusCode: number
    
    constructor(mascota: IUsuario | IUsuario[] | null | {}, method:string, errors?: Error[]) {
        this.mascota = mascota
        this.method = method
        this.error = (!this.mascota && errors) ? true : false
        this.errors = (errors) ? errors : null
        this.statusCode = this.setCode()
    }

    getStatusCode(){
        return this.statusCode
    }

    data(){
        return {
           code: this.statusCode,
           error: this.error,
           data: this.mascota,
           message: this.message() 
        }
    }

    message(){
        if(this.errors) return this.errors
        else 
            return (this.method === "POST")
                ?this.postMessage()
                :(this.method === "GET")
                    ?this.getMessage()
                    :(this.method === "PUT")
                        ?this.putMessage()
                        :this.deleteMessage()                        
    }

    postMessage() {
        return (this.statusCode === 201 )
                ? "El objeto es correcto"
                : "hubo un error"
    }
    getMessage() {
        return (Array.isArray(this.mascota))
        ? "mascotas obtenixas exitosamente"
        : (this.statusCode != 404)
            ? "mascota obtenida exitosamente"
            : "no se ha encontrado la mascota"
    }
    putMessage() {
        return (this.statusCode === 200)?"modificado correctamente": "hubo un error al modificar"
    }
    deleteMessage() {
        return (this.statusCode === 200)?"modificado correctamente": "hubo un error al modificar"

    }

    setCode():number {
        return (this.method === "GET")
                ? this.getCode()
                : (this.method === "POST")
                    ? this.postCode()
                    : (this.method === "PUT")
                        ? this.putCode()
                        : (this.method === "DELETE")
                            ? this.deleteCode()
                            : 405
    }
    getCode():number {
        return ((Array.isArray(this.mascota) || (this.mascota && Object.entries(this.mascota).length >= 1)) && (!this.error))
        ? 200
        : (this.mascota && Object.entries(this.mascota).length < 1 && !this.error)
            ? 404
            : 500
    }
    postCode():number {
        return (this.mascota && this.error === false)
        ? 201
        : 409
    }
    putCode():number {
        return (this.mascota && this.error === false)
        ? 200
        : 409
    }
    deleteCode():number {
        return (this.error)
        ? 500
        : (!this.error && !this.mascota)
            ?404
            :200
    }
}