import * as bcrypt from "bcryptjs";
import { changePasswordSchema } from "@abb/common";

import { ResolverMap } from "../../../types/graphql-utils";
import { createForgotPassworLink } from "../../../utils/createForgotPasswordLink";
import { User } from "../../../entity/User";
import { expiredKeyError } from "./errorMessages";
import { forgotPasswordPrefix } from "../../../constants";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (_, { email }: GQL.ISendForgotPasswordEmailOnMutationArguments, { redis }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return true;
        // return [
        //   {
        //     path: "email",
        //     message: userNotFoundError
        //   }
        // ];
      }
      // Lock user on forget password
      // await forgotPasswordLockAccount(user.id, redis);
      const url = await createForgotPassworLink(process.env.FRONTEND_HOST as string, user.id, redis);
      await sendEmail(email, url, "Reset password");
      return true;
    },
    forgotPasswordChange: async (_, { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments, { redis }) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;
      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: "newPassword",
            message: expiredKeyError
          }
        ];
      }

      try {
        await changePasswordSchema.validate({ newPassword }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      const updatePromise = User.update(
        { id: userId },
        {
          forgotPasswordLocked: false,
          password: hashedPassword
        }
      );

      const deleteKeyPromise = redis.del(redisKey);
      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }
};
