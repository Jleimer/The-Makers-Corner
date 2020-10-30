const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  commentBody: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) =>
      moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
  },
});

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
    comments: [CommentSchema],
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
