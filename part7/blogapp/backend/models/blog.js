const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.pre("deleteOne", { document: true }, async function () {
  await this.model("User")
    .findById(this.user)
    .updateOne({ $pull: { blogs: this._id } });
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
