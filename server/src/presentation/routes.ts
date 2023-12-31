import { Router } from "express";
import { UserRoutes } from "./user";
import { FolderRoutes } from "./folder";
import { FileRoutes } from "./file";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/user", UserRoutes.routes);
        router.use("/api/folder", FolderRoutes.routes);
        router.use("/api/file", FileRoutes.routes);

        return router;
    }
}
