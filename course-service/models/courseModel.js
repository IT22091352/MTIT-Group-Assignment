const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { versionKey: false }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

function sanitize(doc) {
  if (!doc) {
    return null;
  }

  const plain = doc.toObject ? doc.toObject() : doc;
  delete plain._id;
  return plain;
}

async function getAll() {
  return Course.find({}, { _id: 0 }).sort({ id: 1 }).lean();
}

async function getById(id) {
  return Course.findOne({ id }, { _id: 0 }).lean();
}

async function create(courseData) {
  const last = await Course.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).lean();
  const newId = last ? last.id + 1 : 1;
  const newCourse = await Course.create({
    id: newId,
    title: courseData.title,
    description: courseData.description
  });

  return sanitize(newCourse);
}

async function update(id, courseData) {
  const updated = await Course.findOneAndUpdate(
    { id },
    { title: courseData.title, description: courseData.description },
    { new: true, runValidators: true }
  ).lean();

  return sanitize(updated);
}

async function remove(id) {
  const deleted = await Course.findOneAndDelete({ id }).lean();
  return sanitize(deleted);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
