import { Hono } from "hono";

import {
  LogInWithUsernameAndPassword,
  signUpWithUsernameAndPassword,
} from "../controllers/authentication/authentication-controller";
import {
  LogInWithUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
} from "../controllers/authentication/+types";

export const authenticationRoutes = new Hono();

authenticationRoutes.post("/authentication/sign-up", async (context) => {
  const { username, password } = await context.req.json();
  try {
    const result = await signUpWithUsernameAndPassword({
      username,
      password,
    });
    return context.json(
      {
        data: result,
        message: "all ok",
      },
      201
    );
  } catch (e) {
    if (e === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
      return context.json(
        {
          message: "USername is already existing",
        },
        409
      );
    }
    if (e === SignUpWithUsernameAndPasswordError.UNKNOWN) {
      return context.json(
        {
          message: "Server error",
        },
        500
      );
    }
  }
});

authenticationRoutes.post("/authentication/log-in", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const result = await LogInWithUsernameAndPassword({
      username,
      password,
    });
    return c.json(
      {
        data: result,
      },
      201
    );
  } catch (e) {
    if (
      e === LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD
    ) {
      return c.json(
        {
          message: "INcorrect username or password",
        },
        401
      );
    }
    return c.json(
      {
        message: "Server error",
      },
      500
    );
  }
});
