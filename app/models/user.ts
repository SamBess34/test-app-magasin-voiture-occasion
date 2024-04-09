// userModel.ts
import { Schema, model, models } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "buyer" },
  },
  { collection: "user" }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
