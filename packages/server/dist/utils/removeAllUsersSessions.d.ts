import { Redis } from "ioredis";
export declare const removeAllUsersSessions: (userId: string, redis: Redis) => Promise<void>;
