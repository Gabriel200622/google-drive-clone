import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { UserRepository } from "../domain/interfaces";
import { responseHandler } from "../utils";
import { Profile } from "../domain";

export class UserMiddleware {
    constructor(private readonly userRepository: UserRepository) {}

    public checkAuth = async (req: any, res: Response, next: NextFunction) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            token = req?.cookies?.token;
        }

        if (!token) {
            return responseHandler({
                data: null,
                status: 401,
                msg: "Not logged in",
                res: res,
            });
        }

        try {
            const data: any = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            );

            new Profile(this.userRepository)
                .execute(data.id)
                .then((user) => {
                    if (!user) {
                        return responseHandler({
                            data: null,
                            status: 401,
                            msg: "Not logged in",
                            res: res,
                        });
                    }

                    req.user = user as any;

                    next();
                })
                .catch((error) =>
                    responseHandler({
                        data: null,
                        status: 401,
                        msg: error.message,
                        error: error,
                        res: res,
                    })
                );
        } catch (error: any) {
            return responseHandler({
                data: null,
                status: 500,
                msg: "Something went wrong",
                error: error,
                res: res,
            });
        }
    };
}
