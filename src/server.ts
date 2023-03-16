import bodyParser from "body-parser";
import cors from "cors";
import express, { type Application } from "express";
import adminRoute from "./routes/admin";
import { paths } from "./routes/paths";
import { connectToDatabase } from "./utils/db";

const port = process.env.PORT;

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;
    private readonly paths: {
        default: string;
        admin: string;
        product: string;
    };

    constructor() {
        void connectToDatabase(process.env.DATABASE_CONNECTION_LINK as string);
        this.app = express();
        this.port = port != null && port.length > 0 && !Number.isNaN(port) ? Number(port) : 5000;
        this.paths = paths;
        this.middleware();
        this.routes();
    }

    middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    routes(): void {
        this.app.get(this.paths.default, (_, response) => {
            response.send("The server is up and running!");
        });
        this.app.use(this.paths.admin, adminRoute);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at https://localhost:${this.port}`);
        });
    }
}
