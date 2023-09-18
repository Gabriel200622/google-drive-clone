import axios from "axios";
import type { Request, Response } from "express";
import { UserRepository } from "../../domain/interfaces";
import { AuthGoogle, UserDto } from "../../domain";
import { generateJWT, responseHandler } from "../../utils";
import { OAuth2Client } from "google-auth-library";
import { envs } from "../../config";
import { generateUsername } from "../../utils";
import { serialize } from "cookie";

export class UserController {
    constructor(private readonly userRepository: UserRepository) {}

    public authGoogleCallback = async (req: Request, res: Response) => {
        const { code } = req.query;

        try {
            const oAuth2Client = new OAuth2Client({
                clientId: envs.GOOGLE_CLIENT_ID,
                clientSecret: envs.GOOGLE_CLIENT_SECRET,
                redirectUri: `${envs.APP_URL}/api/user/auth/google/callback`,
            });

            const tokenRes = await oAuth2Client.getToken(code as string);
            await oAuth2Client.setCredentials(tokenRes.tokens);

            const { data } = await axios.get(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenRes.tokens.access_token}`
            );

            if (!data) {
                return responseHandler({
                    data: null,
                    status: 401,
                    msg: "Token is invalid",
                    res: res,
                });
            }

            const userDto = new UserDto({
                name: data.name,
                username: generateUsername(data.email),
                email: data.email,
                userImageUrl: data.picture,
            });

            new AuthGoogle(this.userRepository)
                .execute(userDto)
                .then((user) => {
                    if (user) {
                        const token = generateJWT(user.id);

                        const serialized = serialize("token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "lax",
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                            path: "/",
                            domain:
                                process.env.NODE_ENV === "production"
                                    ? `.${process.env.SITE_URL_COOKIE}`
                                    : undefined,
                        });

                        res.setHeader("Set-Cookie", serialized);
                        return res.redirect(envs.CLIENT_URL);
                    } else {
                        return responseHandler({
                            data: null,
                            status: 401,
                            msg: "Something went wrong",
                            res: res,
                        });
                    }
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
        } catch (error) {
            return responseHandler({
                data: null,
                status: 500,
                msg: "Something went wrong",
                error: error,
                res: res,
            });
        }
    };

    public authGoogle = async (req: Request, res: Response) => {
        const oAuth2Client = new OAuth2Client({
            clientId: envs.GOOGLE_CLIENT_ID,
            clientSecret: envs.GOOGLE_CLIENT_SECRET,
            redirectUri: `${envs.APP_URL}/api/user/auth/google/callback`,
        });

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: "https://www.googleapis.com/auth/userinfo.profile openid email",
            prompt: "consent",
        });

        res.redirect(authorizeUrl);
    };

    public profile = async (req: Request, res: Response) => {
        try {
            return responseHandler({
                data: req.user,
                status: 200,
                msg: "success",
                res: res,
            });
        } catch (error) {
            return responseHandler({
                data: null,
                status: 500,
                msg: "Something went wrong",
                error: error,
                res: res,
            });
        }
    };

    public logOut = async (req: Request, res: Response) => {
        try {
            const serialized = serialize("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 0,
                path: "/",
                domain:
                    process.env.NODE_ENV === "production"
                        ? `.${process.env.SITE_URL_COOKIE}`
                        : undefined,
            });

            res.setHeader("Set-Cookie", serialized);
            return responseHandler({
                msg: "success",
                res: res,
                status: 200,
            });
        } catch (error) {
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
