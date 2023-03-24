import bodyParser from "body-parser";
import cors from "cors";
import { createSession } from "./session-options";
import express, { type Application } from "express";
import { connectToDatabase } from "./Database";
import { setupRoutes } from "./routes/paths";
import { port } from "./environment-variables";

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        void connectToDatabase();
        this.app = express();
        this.port = port !== undefined ? Number(port) : 5000;
        this.middleware();
        this.routes();
    }

    middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(createSession());
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
