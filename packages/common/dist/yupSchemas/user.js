"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.emailNotLongEnough = "email must be at least 3 characters";
exports.passwordNotLongEnough = "password must be at least 3 characters";
exports.invalidEmail = "email must be a valid email";
exports.invalidCredentials = "invalid credentials";
exports.registerPasswordValidation = yup
    .string()
    .min(3, exports.passwordNotLongEnough)
    .max(255)
    .required();
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    password: exports.registerPasswordValidation
});
exports.loginSchema = yup.object().shape({
    email: yup
        .string()
        .email(exports.invalidCredentials)
        .required("required")
        .max(255, exports.invalidCredentials),
    password: yup
        .string()
        .min(3, exports.invalidCredentials)
        .max(255, exports.invalidCredentials)
        .required(exports.invalidCredentials)
});
exports.changePasswordSchema = yup.object().shape({
    newPassword: exports.registerPasswordValidation
});
//# sourceMappingURL=user.js.map