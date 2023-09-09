import { UserEntity } from "../../domain";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity;
        }
    }
}
