import mongoose from "mongoose";
import { databaseLink } from "../environment-variables";

export const connectToDatabase = async (): Promise<void> => {
    // TODO: add environment variables validation
    if (databaseLink === undefined) throw new Error("Database connection link is undefined!");
    mongoose.set("strictQuery", true);
    await mongoose.connect(databaseLink);
    console.log("[server]: Connected to database");
};
