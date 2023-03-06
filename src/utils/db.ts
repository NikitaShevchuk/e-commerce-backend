import mongoose from "mongoose";

export const connectToDatabase = async (databaseLink: string) => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(databaseLink);
        console.log("[server]: Connected to database");
    } catch (error) {
        console.log(`[server]: Database errors: ${error ? error : "0 errors"}`);
    }
};
