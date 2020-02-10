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
let conn;
let userId = "";
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
describe("logout", () => {
    it("multiple sessions", () => __awaiter(void 0, void 0, void 0, function* () {
        const sess1 = new TestClient_1.TestClient(process.env.TEST_HOST);
        const sess2 = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield sess1.login(email, password);
        yield sess2.login(email, password);
        expect(yield sess1.me()).toEqual(yield sess2.me());
        yield sess1.logout();
        expect(yield sess1.me()).toEqual(yield sess2.me());
    }));
    it("Single session", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                id: userId,
                email
            }
        });
        yield client.logout();
        const response2 = yield client.me();
        expect(response2.data.me).toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    conn.close();
}));
//# sourceMappingURL=logout.test.js.map