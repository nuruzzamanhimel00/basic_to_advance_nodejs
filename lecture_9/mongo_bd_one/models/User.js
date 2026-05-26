import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null // nullable
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

export default User;