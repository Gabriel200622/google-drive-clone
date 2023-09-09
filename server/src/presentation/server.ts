import express, { type Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { envs } from "../config";

interface StartOptions {
    port: number;
    routes: Router;
}

export class Server {
    private app = express();

    public async start(options: StartOptions) {
        this.setupMiddlewares();

        this.app.use(options.routes);

        const PORT = options.port;

        this.app.listen(PORT, () => {
            console.log(`Server on port ${PORT}`);
        });
    }

    private setupMiddlewares() {
        const allowedDomains = [envs.APP_URL, envs.CLIENT_URL];
        const configCors = {
            origin: function (origin: any, callback: any) {
                if (!origin) return callback(null, true);

                if (allowedDomains.indexOf(origin) === -1) {
                    return callback(
                        new Error(
                            `This site ${origin} does not have an access. Only specific domains are allowed to access it.`
                        ),
                        false
                    );
                }

                return callback(null, true);
            },
            credentials: true,
        };

        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors(configCors));
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "./uploads",
            })
        );
    }
}
