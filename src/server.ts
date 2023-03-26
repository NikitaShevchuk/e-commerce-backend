import bodyParser from "body-parser";
import cors from "cors";
import { createSession } from "./security/session-options";
import express, { type Application } from "express";
import { connectToDatabase } from "./database";
import { setupRoutes } from "./routes/paths";
import { cookieSecret, port } from "./environment-variables";
import cookieParser from "cookie-parser";

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        void connectToDatabase();
        this.app = express();
        this.port = port !== undefined ? Number(port) : 5000;
        this.middleware();
        setupRoutes(this.app);
    }

    middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(createSession());
        this.app.use(cookieParser(cookieSecret));
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at https://localhost:${this.port}`);
        });
    }
}
