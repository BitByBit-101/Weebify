import express from "express";
import axios from "axios";
import Watchlist from "../models/Watchlist.js";
import AnimeRating from "../models/AnimeRating.js";

const router = express.Router();

// Middleware to check if user is authenticated using Passport.js
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

// Anime Search Route (public)
router.get("/search", async (req, res) => {
  const query = req.query.animesearched;
  if (!query) return res.redirect("/");

  try {
    const response = await axios.get("https://api.jikan.moe/v4/anime", {
      params: { q: query, limit: 15 },
    });

    const results = response.data.data;
    const encodedQuery = encodeURIComponent(query);
    res.render("searchResults", { results, query, encodedQuery });
  } catch (error) {
    console.error("Anime search error:", error);
    res.status(500).send("Error fetching anime data.");
  }
});


// Add Anime to Watchlist
router.post("/anime/watchlist", isLoggedIn, async (req, res) => {
  try {
    const { animeId, animeTitle, query } = req.body;
    const userId = req.user._id;

    const exists = await Watchlist.findOne({ user: userId, animeId });
    if (!exists) {
      const entry = new Watchlist({ user: userId, animeId, animeTitle });
      await entry.save();
    }

    res.redirect(`/search?animesearched=${encodeURIComponent(query)}`);
  } catch (error) {
    console.error("Failed to add to watchlist:", error);
    res.status(500).send("Server error");
  }
});


// Rate Anime
router.post("/anime/rate", isLoggedIn, async (req, res) => {
  try {
    const { animeId, animeTitle, rating, redirectTo } = req.body; // include animeTitle
    const userId = req.user._id;

    console.log(`User ${userId} rated Anime ${animeId} (${animeTitle}) with ${rating} stars`);

    await AnimeRating.findOneAndUpdate(
      { user: userId, animeId },
      { user: userId, animeId, animeTitle, rating }, // save animeTitle
      { upsert: true, new: true }
    );
    console.log("animeTitle from form:", animeTitle);
    res.redirect(redirectTo || "/");
  } catch (error) {
    console.error("Failed to save rating:", error);
    res.status(500).send("Server error");
  }
});

export default router;
