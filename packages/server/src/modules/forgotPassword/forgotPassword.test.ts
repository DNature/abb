import * as faker from "faker";
import { User } from "../../entity/User";
import { Connection } from "typeorm";
import { TestClient } from "../../utils/TestClient";
import { createForgotPassworLink } from "../../utils/createForgotPasswordLink";
import { redis } from "../../redis";
import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { forgotPasswordLockedError } from "../login/errorMessages";
import { passwordNotLongEnough } from "@abb/common";
import { expiredKeyError } from "./errorMessages";
import { createTestConn } from "../../testUtils/createTestConn";

let conn: Connection;

let userId = "";
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = "uieyuiwryrwewewerewr";

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

describe("forgot password", () => {
  it("make sure it works", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    // lock account
    await forgotPasswordLockAccount(userId, redis);
    const url = await createForgotPassworLink("", userId, redis);

    const parts = url.split("/");
    const key = parts[parts.length - 1];

    // make sure you cant login to locked account
    expect(await client.login(email, password)).toEqual({
      data: {
        login: [
          {
            path: "email",
            message: forgotPasswordLockedError
          }
        ]
      }
    });

    // try changing to a password thats too short
    expect(await client.forgotPasswordChange("a", key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "newPassword",
            message: passwordNotLongEnough
          }
        ]
      }
    });

    const response = await client.forgotPasswordChange(newPassword, key);
    expect(response.data).toEqual({
      forgotPasswordChange: null
    });

    // make sure redis key expires after password change
    expect(await client.forgotPasswordChange("lkasdfkljdajk", key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "key",
            message: expiredKeyError
          }
        ]
      }
    });

    expect(await client.login(email, newPassword)).toEqual({
      data: {
        login: null
      }
    });
  });
});

afterAll(async () => {
  conn.close();
});
