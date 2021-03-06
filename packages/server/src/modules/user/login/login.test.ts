import * as faker from "faker";
import { Connection } from "typeorm";

import { TestClient } from "../../../utils/TestClient";
import { invalidLogin, confirmEmailError } from "./errorMessages";
import { User } from "../../../entity/User";
import { createTestConn } from "../../../testUtils/createTestConn";

const email = faker.internet.email();
const password = faker.internet.password();

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});
const loginExpectError = async (client: TestClient, e: string, p: string, errMsg: string) => {
  const response = await client.login(e, p);

  expect(response.data).toEqual({
    login: [
      {
        path: "email",
        message: errMsg
      }
    ]
  });
};

describe("login", () => {
  it("email not found sends bad error", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await loginExpectError(client, "bob@bob.com", "whatever", invalidLogin);
  });

  it("email not confirmed", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.register(email, password);
    await loginExpectError(client, email, password, confirmEmailError);
    await User.update({ email }, { confirmed: true });

    await loginExpectError(client, email, "kasdfkasdf", invalidLogin);

    const response = await client.login(email, password);

    expect(response.data).toEqual({ login: null });
  });
});
