import { User } from "./user";
import { Request } from "./request";

export class School {
    schoolID: string;
    name: string;
    address: string;
    city: string;
    admins: User[];
    requests: Request[];
}