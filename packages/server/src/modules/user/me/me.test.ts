import * as faker from "faker";
import { User } from "../../../entity/User";
import { Connection } from "typeorm";
import { TestClient } from "../../../utils/TestClient";
import { createTestConn } from "../../../testUtils/createTestConn";

let userId: string;
let conn: Connection;

const email = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

describe("me", () => {
  it("return null if no cookie", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.me();
    expect(response.data.me).toBeNull();
  });

  it("get current user", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(email, password);
    const response = await client.me();
    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    });
  });
});

afterAll(async () => {
  conn.close();
});