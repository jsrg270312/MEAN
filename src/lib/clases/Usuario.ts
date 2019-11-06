import { Usuario as IUsuario } from "./../../interfaces/"

export default class Usuario {

    private id: IUsuario["id"]
    private email: IUsuario["email"]
    private password: IUsuario["password"]
    private userType: IUsuario["userType"] = "user"
    private createdAt: IUsuario["createdAt"] = Date.now()
    private updatedAt: IUsuario["updatedAt"] = Date.now()
    private active: IUsuario["active"] = false

    private usuarios: IUsuario[] = [
        {
          id: 1,
          email:"111111@1111.com",
          password: "111111",
          userType: "user",
          active: false,
          createdAt: 1573082179242,
          updatedAt: 0,
        },
        {
            id: 2,
            email:"2222@2222.com",
            password: "222222",
            userType: "user",
            active: false,
            createdAt: 1573082179252,
            updatedAt: 0,
          },
          {
            id: 3,
            email:"3333@3333.com",
            password: "333333",
            userType: "user",
            active: false,
            createdAt: 1573082179262,
            updatedAt: 0,
          }
      ];
    
    constructor(body: IUsuario){
        const {id, email, password} = body
        this.id = id
        this.email = email
        this.password = password
    }


}