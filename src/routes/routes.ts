import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { prisma } from "../extras/prisma";

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

allRoutes.get("/users", async (context) => {
  const users = await prisma.user.findMany();
  return context.json(users, 200);
});
