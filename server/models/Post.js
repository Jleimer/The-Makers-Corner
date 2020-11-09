const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 40,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
