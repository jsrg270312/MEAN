export default interface Usuario { 
    id: number;
    email: string;
    password: string;
    userType: string;
    active: boolean;
    createdAt: number;
    updatedAt: number;
}