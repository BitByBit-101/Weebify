import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  animeId: { type: String, required: true },
  animeTitle: { type: String, required: true },
});

export default mongoose.model("Watchlist", watchlistSchema);
