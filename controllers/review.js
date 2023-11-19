const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.reviewPost = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  const newReview = new Review(req.body.review);
  newReview.owner = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review Added Successfully !!");
  res.redirect(`/listings/${id}`);
};

module.exports.reviewDestroy = async (req, res, next) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully !!");
  res.redirect(`/listings/${id}`);
};
