import { Hono } from "hono";
import { signUpWithUsernameAndPassword } from "../controllers/authentication";
import { SignUpWithUsernameAndPasswordError } from "../controllers/authentication/+types";

export const hono = new Hono();

hono.post("/authentication/sign-up", async (context) => {
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
hono.get("/health", (context) => {
  return context.json(
    {
      message: "All ok",
    },
    200
  );
});

hono.post("");
