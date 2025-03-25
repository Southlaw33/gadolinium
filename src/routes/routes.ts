import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";

export const allRoutes = new Hono();

allRoutes.route("/authentication", authenticationRoutes);

allRoutes.get("/health", (context) => {
  return context.json(
    {
      message: "All ok",
    },
    200
  );
});
