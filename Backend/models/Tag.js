const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a tag's name"],
    unique: true,
  },
});

// //Reverse populate with virtuals
// TagSchema.virtual("campgrounds", {
//   ref: "Campground",
//   localField: "_id",
//   foreignField: "Tags",
//   justOne: false,
// });

// TagSchema.pre(
//   "deleteOne",
//   { document: true, query: false },
//   async function (next) {
//     console.log(`tag: ${this._id} being removed from other campground`);
//     await this.model("Campground").deleteMany({ tag: this._id });
//     next();
//   }
// );

module.exports = mongoose.model("Tag", TagSchema);
