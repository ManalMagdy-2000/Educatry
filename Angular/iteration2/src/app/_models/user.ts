import { Offer } from "./offer";
import { Role } from "./role";
import { School } from "./school";

export class User {
    id: string;
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    occupation?: string;
    dateOfBirth?: string;
    role: Role;
    school?: string;
    offers?: Offer[];
    position?: string;
    token: string;
}