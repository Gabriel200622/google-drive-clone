import express, { type Router } from "express";

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
    this.app.use(express.json());
  }
}
