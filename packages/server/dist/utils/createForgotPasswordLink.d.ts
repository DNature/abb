import { Redis } from "ioredis";
export declare const createForgotPassworLink: (url: string, userId: string, redis: Redis) => Promise<string>;
