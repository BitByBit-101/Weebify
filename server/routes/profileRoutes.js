import express from "express";
import multer from "multer";
import path from "path";
import AnimeRating from "../models/AnimeRating.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware to protect route
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/google");
}

// Multer setup for profile picture upload
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

/**
 * GET /profile
 * Shows user profile with all anime ratings and average ratings
 */
router.get("/profile", ensureAuthenticated, async (req, res) => {
  try {
    const userRatings = await AnimeRating.find({ user: req.user._id });

    // Build list with average ratings included
    const ratingsWithAvg = await Promise.all(
      userRatings.map(async (ratingDoc) => {
        const { animeId, animeTitle, rating } = ratingDoc;

        const avg = await AnimeRating.aggregate([
          { $match: { animeId } },
          {
            $group: {
              _id: "$animeId",
              avgRating: { $avg: "$rating" },
            },
          },
        ]);

        return {
          animeId,
          animeTitle,
          rating,
          avgRating: avg[0]?.avgRating?.toFixed(2) || "N/A",
        };
      })
    );

    res.render("profile", {
      user: req.user,
      ratings: ratingsWithAvg,
    });

  } catch (error) {
    console.error("Error loading profile:", error);
    res.status(500).send("Server error");
  }
});

/**
 * POST /profile/pic
 * Upload and save profile picture
 */
router.post("/profile/pic", ensureAuthenticated, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.profilePic = `/uploads/${req.file.filename}`;
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error("Error uploading picture:", error);
    res.status(500).send("Server error");
  }
});

/**
 * POST /anime/unrate
 * Removes the user's rating for a specific anime
 */
router.post("/anime/unrate", ensureAuthenticated, async (req, res) => {
  try {
    const { animeId } = req.body;
    const userId = req.user._id;

    console.log(`Attempting to delete rating for animeId: ${animeId} by user: ${userId}`);

    const deleted = await AnimeRating.findOneAndDelete({ user: userId, animeId });

    console.log("Deleted rating:", deleted);

    res.redirect("/profile");
  } catch (error) {
    console.error("Failed to remove rating:", error);
    res.status(500).send("Server error");
  }
});


export default router;
