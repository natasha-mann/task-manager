import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>("User", UserSchema);
