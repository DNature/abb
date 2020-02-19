export interface MeQyery_me {
    __typename: "User";
    email: string;
}
export interface MeQyery {
    me: MeQyery_me | null;
}
