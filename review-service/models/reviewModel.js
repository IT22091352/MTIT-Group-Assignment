const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    courseId: { type: Number, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { versionKey: false }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

function sanitize(doc) {
  if (!doc) {
    return null;
  }

  const plain = doc.toObject ? doc.toObject() : doc;
  delete plain._id;
  return plain;
}

async function getAll() {
  return Review.find({}, { _id: 0 }).sort({ id: 1 }).lean();
}

async function getById(id) {
  return Review.findOne({ id }, { _id: 0 }).lean();
}

async function create(reviewData) {
  const last = await Review.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).lean();
  const newId = last ? last.id + 1 : 1;
  const newReview = await Review.create({
    id: newId,
    userId: reviewData.userId,
    courseId: reviewData.courseId,
    rating: reviewData.rating,
    comment: reviewData.comment
  });

  return sanitize(newReview);
}

async function update(id, reviewData) {
  const updated = await Review.findOneAndUpdate(
    { id },
    {
      userId: reviewData.userId,
      courseId: reviewData.courseId,
      rating: reviewData.rating,
      comment: reviewData.comment
    },
    { new: true, runValidators: true }
  ).lean();

  return sanitize(updated);
}

async function remove(id) {
  const deleted = await Review.findOneAndDelete({ id }).lean();
  return sanitize(deleted);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
