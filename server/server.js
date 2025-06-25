import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import animeRoutes from "./routes/animeRoutes.js";
import playlistRoutes from "./routes/playlist.js";
import "./config/passport.js"; // Your passport setup file
import authRoutes from "./routes/authRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get('/quiz', (req, res) => {
  res.render('quiz'); // renders views/quiz.ejs
});
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/", animeRoutes);
app.use("/playlist", playlistRoutes);
app.use("/", profileRoutes);
app.use((req, res, next) => {
  res.status(404).render("404",{ title: "404 Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
