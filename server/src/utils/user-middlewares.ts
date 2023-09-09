import { MongoUserDataSource } from "../data/datasources/mongo";
import { UserRepositoryImpl } from "../domain";
import { UserMiddleware } from "../middlewares";

export const userMiddlewares = () => {
    const userDatasource = new MongoUserDataSource();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const middleware = new UserMiddleware(userRepository);

    return middleware;
};
