import "dotenv/config";
import { hono } from "./routes";
import { serve } from "@hono/node-server";

serve(hono, (info) => {
  console.log(`server is running on port ${info.port}`);
});
