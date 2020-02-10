import { Redis } from "ioredis";
export declare const forgotPasswordLockAccount: (userId: string, redis: Redis) => Promise<void>;
