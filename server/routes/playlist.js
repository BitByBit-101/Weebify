import express from "express";
import Watchlist from "../models/Watchlist.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

// Watchlist Page
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user._id });
    res.render("playlist", { watchlist });
  } catch (error) {
    console.error("Failed to load watchlist:", error);
    res.status(500).send("Server error");
  }
});

// Remove from Watchlist
router.post("/delete", isLoggedIn, async (req, res) => {
  try {
    const { animeId } = req.body;
    console.log("Attempting to delete animeId:", animeId, "for user:", req.user._id);
    const result = await Watchlist.findOneAndDelete({ user: req.user._id, animeId: String(animeId) });
    console.log("Delete result:", result);
    res.redirect("/playlist");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Server error");
  }
});


export default router;
