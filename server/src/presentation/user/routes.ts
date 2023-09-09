import { Router } from "express";
import { UserController } from "./controller";
import { UserRepositoryImpl } from "../../domain";
import { MongoUserDataSource } from "../../data/datasources/mongo/mongo-user.datasource";
import { UserMiddleware } from "../../middlewares";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new MongoUserDataSource();
        const repository = new UserRepositoryImpl(datasource);
        const controller = new UserController(repository);

        const middleware = new UserMiddleware(repository);

        router.get("/", middleware.checkAuth, controller.profile);
        router.get("/auth/google", controller.authGoogle);
        router.get("/auth/google/callback", controller.authGoogleCallback);

        /* router.post("/upload", async (req, res) => {
            if (req.files?.image) {
                const result = await uploadFile(req.files.image);

                res.json({ data: result });
            }
        }); */

        return router;
    }
}
