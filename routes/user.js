const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(wrapAsync(userController.signup))
  .post(wrapAsync(userController.signupPost));

router
  .route("/login")
  .get(wrapAsync(userController.login))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "login",
      failureFlash: true,
    }),
    wrapAsync(userController.loginPost)
  );

router.get("/logout", wrapAsync(userController.logout));

module.exports = router;
