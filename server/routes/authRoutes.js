import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.send(`
      <script>
        localStorage.removeItem('loaderShown');
        window.location.href = "/";
      </script>
    `);
  });
});

export default router;
