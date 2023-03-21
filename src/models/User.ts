import * as mongoose from "mongoose";

export interface IUser extends Document {
    title: string;
}

const UserSchema = new mongoose.Schema<IUser, mongoose.Model<IUser>, IUser>(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100,
            minlength: 3
        }
    },
    { collection: "Users" }
);

export default mongoose.model("UserSchema", UserSchema);
export type UserSchemaType = typeof UserSchema;
