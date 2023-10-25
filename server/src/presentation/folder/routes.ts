import { Router } from "express";
import { MongoFolderDataSource } from "../../data/datasources/mongo";
import { FolderController } from "./controller";
import { FolderRepositoryImpl } from "../../domain/repositories";
import { userMiddlewares } from "../../utils/user-middlewares";

export class FolderRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoFolderDataSource();
    const repository = new FolderRepositoryImpl(datasource);
    const controller = new FolderController(repository);

    const { checkAuth } = userMiddlewares();

    router.post("/create", checkAuth, controller.createFolder);

    router.get("/f/:folderId", checkAuth, controller.getFolder);
    router.get("/tree/:folderId", checkAuth, controller.getFolderTree);

    router.delete("/:folderId", checkAuth, controller.deleteFolder);
    router.get("/all", checkAuth, controller.getFolders);

    return router;
  }
}
