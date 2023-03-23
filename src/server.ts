import bodyParser from "body-parser";
import cors from "cors";
import express, { type Application } from "express";
import { connectToDatabase } from "./utils/db";
import { setupRoutes } from "./routes/paths";
import session from "express-session";

const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;
const databaseLink = process.env.DATABASE_CONNECTION_LINK;

const validatePortFromEnv = (port: string | undefined): boolean =>
    port !== undefined && port.length > 0 && !Number.isNaN(port);

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        // TODO: add environment variables validation
        if (databaseLink === undefined) throw new Error("Database connection link is undefined!");
        void connectToDatabase(databaseLink);
        this.app = express();
        this.port = validatePortFromEnv(port) ? Number(port) : 5000;
        this.middleware();
        this.routes();
    }

    middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // TODO: add environment variables validation
        if (sessionSecret === undefined) throw new Error("Session secret is undefined!");
        this.app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }));
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
