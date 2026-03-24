const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

function sanitize(doc) {
  if (!doc) {
    return null;
  }

  const plain = doc.toObject ? doc.toObject() : doc;
  delete plain._id;
  return plain;
}

async function getAll() {
  return User.find({}, { _id: 0 }).sort({ id: 1 }).lean();
}

async function getById(id) {
  return User.findOne({ id }, { _id: 0 }).lean();
}

async function create(userData) {
  const last = await User.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).lean();
  const newId = last ? last.id + 1 : 1;
  const newUser = await User.create({
    id: newId,
    name: userData.name,
    email: userData.email
  });

  return sanitize(newUser);
}

async function update(id, userData) {
  const updated = await User.findOneAndUpdate(
    { id },
    { name: userData.name, email: userData.email },
    { new: true, runValidators: true }
  ).lean();

  return sanitize(updated);
}

async function remove(id) {
  const deleted = await User.findOneAndDelete({ id }).lean();
  return sanitize(deleted);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
