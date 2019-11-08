import {Usuario} from "./"

interface UsuarioResponse{
    code: number;
    error: boolean;
    data: Usuario | Usuario | {} | null;
    messages: Error[]
}

interface Error {
    message: string;
    name: string;
    properties: {
        message: string;
        type: string;
        path: string; 
        value: string;
    }
    kind: string;
    path: string;
    value: string;
}

export{
    UsuarioResponse,
    Error
}