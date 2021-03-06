require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import { applyMiddleware } from "graphql-middleware";
import * as RateLimitRedisStore from "rate-limit-redis";

import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { createTypeormConn } from "./utils/createTypormConn";
import { redisSessionPrefix } from "./constants";
import { createTestConn } from "./testUtils/createTestConn";
import { middleware } from "./middleware";

// const SESSION_SECRET = 'ajslkjalksjdfkl';
const RedisStore = connectRedis(session);

export const startServer = async () => {
  const schema = genSchema();

  applyMiddleware(schema, middleware);

  const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request,
    }),
  });

  server.express.use(
    RateLimit({
      store: new RateLimitRedisStore({
        client: redis,
      }),
      windowMs: 15 * 60 * 100,
      max: 100,
      message:
        "Too many accounts created from this IP, please try again after an hour",
    })
  );

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix,
      }),
      name: "qid",
      secret: "what is your secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  server.express.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
    await createTestConn(true);
  } else {
    const conn = await createTypeormConn();
    await conn.runMigrations();
  }
  const cors = {
    credentials: process.env.NODE_ENV !== "production",
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string),
  };

  const port = process.env.PORT || 4000;
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : port,
  });

  console.log("Server is running on localhost:4000");

  return app;
};
