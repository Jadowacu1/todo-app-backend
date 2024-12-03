import mongoose, { Schema, Document, model } from "mongoose";

interface users extends Document {
  email: { type: string; required: true };
  Password: string;
}

const userSchema: Schema<users> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const usersModel = mongoose.model<users>("Users", userSchema);
export { usersModel };
