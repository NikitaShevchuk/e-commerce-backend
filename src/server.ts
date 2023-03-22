import bodyParser from "body-parser";
import cors from "cors";
import express, { type Application } from "express";
import { connectToDatabase } from "./utils/db";
import { setupRoutes } from "./routes/paths";

const port = process.env.PORT;

const validatePortFromEnv = (port: string | undefined): boolean =>
    port !== undefined && port.length > 0 && !Number.isNaN(port);

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        void connectToDatabase(process.env.DATABASE_CONNECTION_LINK as string);
        this.app = express();
        this.port = validatePortFromEnv(port) ? Number(port) : 5000;
        this.middleware();
        this.routes();
    }

    middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    routes(): void {
        setupRoutes(this.app);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at https://localhost:${this.port}`);
        });
    }
}
