import { User } from "./user";

export class Offer {
    offerID: string;
    offerStatus: string;
    remarks: string;
    offerDate: string;
    volunteer: User;
    request: string;
}