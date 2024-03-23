import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
});

const User = models.User || model("User", UserSchema);

export default User;