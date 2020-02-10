/// <reference types="express-session" />
/// <reference types="express-serve-static-core" />
import { Redis } from "ioredis";
export interface Session extends Express.Session {
    userId?: string;
}
export interface Context {
    redis: Redis;
    url: string;
    session: Session;
    req: Express.Request;
}
export declare type Resolver = (parent: any, args: any, context: Context, info: any) => any;
export declare type GraphQLMiddlewareFunc = (resolver: Resolver, parent: any, args: any, context: Context, info: any) => any;
export interface ResolverMap {
    [key: string]: {
        [key: string]: Resolver;
    };
}
