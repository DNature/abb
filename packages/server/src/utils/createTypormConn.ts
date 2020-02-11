import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log(process.env);
  return process.env.NODE_ENV === "production"
    ? await createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User],
        name: "default"
      } as any)
    : await createConnection({ ...connectionOptions, name: "default" });
};
