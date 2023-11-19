const User = require("../models/user.js");

module.exports.signup = async (req, res, next) => {
  res.render("users/signup.ejs");
};

module.exports.signupPost = async (req, res, next) => {
  try {
    let { first, last, username, email, password } = req.body;
    const newUser = new User({
      first,
      last,
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Welcome To WanderLust ! ${first} ${last}`);
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res, next) => {
  res.render("users/login.ejs");
};

module.exports.loginPost = async (req, res, next) => {
  req.flash("success", `Welcome To WanderLust !`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", `You Are Logged Out !!`);
    res.redirect("/listings");
  });
};
