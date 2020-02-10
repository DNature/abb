import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: string;
    email: string | null;
    password: string | null;
    confirmed: boolean;
    forgotPasswordLocked: boolean;
    twitterId: string | null;
    hashPasswordBeforeInsert(): Promise<void>;
}
