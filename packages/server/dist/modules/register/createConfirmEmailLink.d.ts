import { Redis } from 'ioredis';
export declare const createConfirmEmailLink: (url: string, userId: string, redis: Redis) => Promise<string>;
