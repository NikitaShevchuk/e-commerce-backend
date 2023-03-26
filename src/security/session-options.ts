import session, { type Store } from "express-session";
import { databaseLink, sessionSecret } from "../environment-variables";
import { type RequestHandler } from "express";
import MongoDBStore from "connect-mongodb-session";

export const createSession = (): RequestHandler => {
    // TODO: add environment variables validation
    if (sessionSecret === undefined) throw new Error("Session secret is undefined!");
    if (databaseLink === undefined) throw new Error("Database connection link is undefined!");
    const Store = MongoDBStore(session as any);
    const store = new Store({
        uri: databaseLink ?? "link",
        databaseName: "Ecommerce",
        collection: "sessions"
    }) as Store;
    return session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store
    });
};
