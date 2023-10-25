import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { envs } from "./config";

const main = async () => {
  const server = new Server();
  const routes = AppRoutes.routes;

  server.start({
    port: envs.PORT,
    routes: routes,
  });
};

(async () => {
  main();
})();
