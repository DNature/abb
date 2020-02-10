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
const createTestConn_1 = require("../../testUtils/createTestConn");
let userId;
let conn;
const email = faker.internet.email();
const password = faker.internet.password();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    conn = yield createTestConn_1.createTestConn();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true
    }).save();
    userId = user.id;
}));
describe("me", () => {
    it("return null if no cookie", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.me();
        expect(response.data.me).toBeNull();
    }));
    it("get current user", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                id: userId,
                email
            }
        });
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    conn.close();
}));
//# sourceMappingURL=me.test.js.map