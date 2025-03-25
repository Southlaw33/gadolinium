import "dotenv/config";
import { allRoutes } from "./routes/routes";
import { serve } from "@hono/node-server";

serve(allRoutes, (info) => {
  console.log(`server is running on port ${info.port}`);
});
