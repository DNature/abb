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
const faker = require("faker");
const User_1 = require("../../entity/User");
const TestClient_1 = require("../../utils/TestClient");
const createForgotPasswordLink_1 = require("../../utils/createForgotPasswordLink");
const redis_1 = require("../../redis");
const forgotPasswordLockAccount_1 = require("../../utils/forgotPasswordLockAccount");
const errorMessages_1 = require("../login/errorMessages");
const common_1 = require("@abb/common");
const errorMessages_2 = require("./errorMessages");
const createTestConn_1 = require("../../testUtils/createTestConn");
let conn;
let userId = "";
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = "uieyuiwryrwewewerewr";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    conn = yield createTestConn_1.createTestConn();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true
    }).save();
    userId = user.id;
}));
describe("forgot password", () => {
    it("make sure it works", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(userId, redis_1.redis);
        const url = yield createForgotPasswordLink_1.createForgotPassworLink("", userId, redis_1.redis);
        const parts = url.split("/");
        const key = parts[parts.length - 1];
        expect(yield client.login(email, password)).toEqual({
            data: {
                login: [
                    {
                        path: "email",
                        message: errorMessages_1.forgotPasswordLockedError
                    }
                ]
            }
        });
        expect(yield client.forgotPasswordChange("a", key)).toEqual({
            data: {
                forgotPasswordChange: [
                    {
                        path: "newPassword",
                        message: common_1.passwordNotLongEnough
                    }
                ]
            }
        });
        const response = yield client.forgotPasswordChange(newPassword, key);
        expect(response.data).toEqual({
            forgotPasswordChange: null
        });
        expect(yield client.forgotPasswordChange("lkasdfkljdajk", key)).toEqual({
            data: {
                forgotPasswordChange: [
                    {
                        path: "key",
                        message: errorMessages_2.expiredKeyError
                    }
                ]
            }
        });
        expect(yield client.login(email, newPassword)).toEqual({
            data: {
                login: null
            }
        });
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    conn.close();
}));
//# sourceMappingURL=forgotPassword.test.js.map