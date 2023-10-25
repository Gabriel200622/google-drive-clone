import { Router } from "express";
import { MongoFileDataSource } from "../../data/datasources/mongo/mongo-file.datasource";
import { FileController } from "./controller";
import { FileRepositoryImpl } from "../../domain/repositories";
import { userMiddlewares } from "../../utils/user-middlewares";

export class FileRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoFileDataSource();
    const repository = new FileRepositoryImpl(datasource);
    const controller = new FileController(repository);

    const { checkAuth } = userMiddlewares();

    router.get("/all", checkAuth, controller.getFiles);
    router.post("/upload", checkAuth, controller.uploadFile);
    router.delete("/delete/:fileId", checkAuth, controller.deleteFile);

    return router;
  }
}
