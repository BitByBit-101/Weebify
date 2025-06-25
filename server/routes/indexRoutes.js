import express from "express";
import fetch from "node-fetch"; // Make sure to install node-fetch

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login");
});

// New API route to fetch trending anime data
router.get("/api/trending", async (req, res) => {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime"); // Alternative free API
    const data = await response.json();
    res.json(data.data.slice(0, 10)); // send top 10 anime only
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    res.status(500).json({ error: "Failed to fetch trending anime" });
  }
});

export default router;
