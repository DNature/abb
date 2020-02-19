import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";
import { Listing } from "../entity/Listing";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? await createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User, Listing],
        name: "default"
      } as any)
    : await createConnection({ ...connectionOptions, name: "default" });
};
