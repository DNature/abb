export declare class TestClient {
    url: string;
    options: {
        jar: any;
        withCredentials: boolean;
        json: boolean;
        headers: any;
    };
    constructor(url: string);
    register(email: string, password: string): Promise<any>;
    logout(): Promise<any>;
    forgotPasswordChange(newPassword: string, key: string): Promise<any>;
    me(): Promise<any>;
    login(email: string, password: string): Promise<any>;
}
