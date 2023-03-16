import mongoose from "mongoose";

export const connectToDatabase = async (databaseLink: string): Promise<void> => {
    mongoose.set("strictQuery", true);
    await mongoose.connect(databaseLink);
    console.log("[server]: Connected to database");
};
