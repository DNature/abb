"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const session = require("express-session");
const connectRedis = require("connect-redis");
const RateLimit = require("express-rate-limit");
const RateLimitRedisStore = require("rate-limit-redis");
const redis_1 = require("./redis");
const confirmEmail_1 = require("./routes/confirmEmail");
const genSchema_1 = require("./utils/genSchema");
const createTypormConn_1 = require("./utils/createTypormConn");
const constants_1 = require("./constants");
const createTestConn_1 = require("./testUtils/createTestConn");
const RedisStore = connectRedis(session);
exports.startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new graphql_yoga_1.GraphQLServer({
        schema: genSchema_1.genSchema(),
        context: ({ request }) => ({
            redis: redis_1.redis,
            url: request.protocol + "://" + request.get("host"),
            session: request.session,
            req: request
        })
    });
    server.express.use(RateLimit({
        store: new RateLimitRedisStore({
            client: redis_1.redis
        }),
        windowMs: 15 * 60 * 100,
        max: 100,
        message: "Too many accounts created from this IP, please try again after an hour"
    }));
    server.express.use(session({
        store: new RedisStore({
            client: redis_1.redis,
            prefix: constants_1.redisSessionPrefix
        }),
        name: "qid",
        secret: "what is your secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    server.express.get("/confirm/:id", confirmEmail_1.confirmEmail);
    if (process.env.NODE_ENV === "test") {
        yield redis_1.redis.flushall();
    }
    if (process.env.NODE_ENV === "test") {
        yield createTestConn_1.createTestConn(true);
    }
    else {
        yield createTypormConn_1.createTypeormConn();
    }
    const cors = {
        credentials: process.env.NODE_ENV !== "production",
        origin: process.env.NODE_ENV === "test"
            ? "*"
            : process.env.FRONTEND_HOST
    };
    const app = yield server.start({
        cors,
        port: process.env.NODE_ENV === "test" ? 0 : 4000
    });
    console.log("Server is running on localhost:4000");
    return app;
});
//# sourceMappingURL=startServer.js.map