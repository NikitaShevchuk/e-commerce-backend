import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";

export class ExpressServer {
    private app: Application;
    private readonly port: number;
    private paths: {
        default: string;
    };
    private readonly databaseLink: string;

    constructor() {
        this.app = express();
        this.port = (process.env.PORT as unknown as number) || 5000;
        this.paths = {
            default: ""
        };
        this.middleware();
        this.routes();
        this.databaseLink = process.env.DATABASE_CONNECTION_LINK as string;
        // this.connectToDatabase();
    }

    middleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }
    routes() {
        this.app.use(this.paths.default, () => {});
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at https://localhost:${this.port}`);
        });
    }
}
