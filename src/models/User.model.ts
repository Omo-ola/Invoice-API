import mongoose, { Schema } from "mongoose";
import { Iuser } from "../types/Interface";

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<Iuser>("User", UserSchema);
export default User;
