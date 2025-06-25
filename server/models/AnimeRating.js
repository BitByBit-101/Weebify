import mongoose from "mongoose";

const animeRatingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
  animeTitle: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
}, {
  timestamps: true, // optional: adds createdAt and updatedAt
});

export default mongoose.model("AnimeRating", animeRatingSchema);
