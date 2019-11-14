import mongoose, {Schema, Document}  from "mongoose"

interface Usuario  extends Document {
    id: number;
    email: string;
    password: string;
    userType: string;
    active: boolean;
    createdAt: number;
    updatedAt: number;
}
export{
    Usuario
}