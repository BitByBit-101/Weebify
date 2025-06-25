import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
  profilePic: { type: String, default: "/default.png" },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
