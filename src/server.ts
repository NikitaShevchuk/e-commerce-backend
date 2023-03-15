import bodyParser from "body-parser";
import cors from "cors";
import express, { type Application } from "express";
import adminRoute from "./routes/admin";
import { paths } from "./routes/paths";
import { connectToDatabase } from "./utils/db";

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;
    private readonly paths: {
        default: string;
        admin: string;
        product: string;
    };

    constructor() {
        this.app = express();
        this.port = (process.env.PORT as unknown as number) || 5000;
        this.paths = paths;
        this.middleware();
        this.routes();
        connectToDatabase(process.env.DATABASE_CONNECTION_LINK as string);
    }

    middleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    routes() {
        this.app.get(this.paths.default, (_, response) => {
            response.send("The server is up and running!");
        });
        this.app.use(this.paths.admin, adminRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at https://localhost:${this.port}`);
        });
    }
}
