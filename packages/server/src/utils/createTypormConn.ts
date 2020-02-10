import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log(process.env);
  return process.env.NODE_ENV === "production"
    ? await createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        name: "default"
      } as any)
    : await createConnection({ ...connectionOptions, name: "default" });
};
