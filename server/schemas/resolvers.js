const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Post,
  Category,
  Course,
  Blueprint,
  Order,
  Comment,
  Review,
} = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("key");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    blueprints: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Blueprint.find(params)
        .populate("category")
        .populate("reviews")
        .sort({ createdAt: -1 });
    },
    blueprint: async (parent, { blueprintId }) => {
      return await Blueprint.findById({ _id: blueprintId })
        .populate("category")
        .populate("reviews");
    },
    courses: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Course.find(params)
        .populate("category")
        .populate("reviews")
        .sort({ createdAt: -1 });
    },
    course: async (parent, { courseId }) => {
      return await Course.findById({ _id: courseId })
        .populate("category")
        .populate("reviews");
    },
    posts: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Post.find(params)
        .populate("category")
        .populate("comments")
        .sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return await Post.findById({ _id: postId })
        .populate("category")
        .populate("comments");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({
            path: "orders.courses",
            populate: "category",
          })
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })

          .populate("courses")
          .populate("blueprints")
          .populate("posts");

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, { username }, context) => {
      if (context.user) {
        const user = await User.findById(username)
          .select("-__v -password")
          .populate("courses")
          .populate("blueprints")
          .populate("posts");

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return await User.find().select("-__v -password");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })
          .populate({
            path: "orders.courses",
            populate: "category",
          });
        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({
        courses: args.courses,
        blueprints: args.blueprints,
      });
      const { courses, blueprints } = await order
        .populate("blueprints")
        .populate("courses")
        .execPopulate();
      const products = courses.concat(blueprints);

      const line_items = [];
      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });
        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { session: session.id };
    },
    orderHistory: async (parent, args, context) => {
      if (context.user) {
        await User.findById(context.user._id)
          .select("-password")
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })
          .populate({
            path: "orders.courses",
            populate: "category",
          });
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { blueprints, courses }, context) => {
      if (context.user) {
        const order = new Order({ blueprints, courses });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw new AuthenticationError("Not logged in!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate({ _id: context.user._id }, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in!");
    },
    addBlueprint: async (parent, args, context) => {
      if (context.user) {
        let newBlueprint = await (
          await Blueprint.create({ ...args, username: context.user.username })
        ).populate("category");
        newBlueprint = await newBlueprint.populate("category").execPopulate();

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { blueprints: newBlueprint._id } },
          { new: true }
        );

        return newBlueprint;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addCourse: async (parent, args, context) => {
      if (context.user) {
        let newCourse = await Course.create({
          ...args,
          username: context.user.username,
        });
        newCourse = await newCourse.populate("category").execPopulate();

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { courses: newCourse._id } },
          { new: true }
        );

        return newCourse;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        let newPost = await Post.create({
          ...args,
          username: context.user.username,
        });
        newPost = await newPost.populate("category").execPopulate();

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: newPost._id } },
          { new: true }
        );

        return newPost;
      }
      throw new AuthenticationError("Not logged in!");
    },
    //I don't think this is right
    addCommentPost: async (parent, { postId, args }, context) => {
      if (context.user) {
        let newComment = await Comment.create({
          ...args,
          username: context.user.username,
        });

        await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: newComment._id } },
          { new: true }
        ).populate("comments");

        return Post;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addCourseReview: async (parent, { courseId, args }, context) => {
      if (context.user) {
        const newReview = await Review.create({
          ...args,
          username: context.user.username,
        });

        await Course.findByIdAndUpdate(
          { _id: courseId },
          { $push: { reviews: newReview._id } },
          { new: true }
        ).populate("reviews");

        return Course;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addBlueprintReview: async (parent, { blueprintId, args }, context) => {
      if (context.user) {
        const newReview = await Review.create({
          ...args,
          username: context.user.username,
        });

        await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          { $push: { reviews: newReview._id } },
          { new: true }
        ).populate("reviews");

        return Blueprint;
      }
      throw new AuthenticationError("Not logged in!");
    },
    updateCourse: async (parent, { courseId, ...args }, context) => {
      if (context.user) {
        return await Course.findByIdAndUpdate({ _id: courseId }, args, {
          new: true,
        }).populate("reviews");
      }

      throw new AuthenticationError("Not logged in!");
    },
    updateBlueprint: async (parent, { blueprintId, ...args }, context) => {
      if (context.user) {
        return await Blueprint.findByIdAndUpdate({ _id: blueprintId }, args, {
          new: true,
        }).populate("reviews");
      }
      throw new AuthenticationError("Not logged in!");
    },
    updatePost: async (parent, { postId, ...args }, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate({ _id: postId }, args, {
          new: true,
        }).populate("comments");
      }
      throw new AuthenticationError("Not logged in!");
    },
    deleteBlueprint: async (parent, { blueprintId }, context) => {
      if (context.user) {
        await Blueprint.findByIdAndDelete({ _id: blueprintId });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { blueprints: blueprintId } },
          { new: true }
        )
          .select("-__v -password")
          .populate({
            path: "orders.courses",
            populate: "category",
          })
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })
          .populate("courses")
          .populate("blueprints")
          .populate("posts");

        return User;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteCourse: async (parent, { courseId }, context) => {
      if (context.user) {
        await Course.findByIdAndDelete({ _id: courseId }, { new: true });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { courses: courseId } },
          { new: true }
        )
          .select("-__v -password")
          .populate({
            path: "orders.courses",
            populate: "category",
          })
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })
          .populate("courses")
          .populate("blueprints")
          .populate("posts");

        return User;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        await Post.findByIdAndDelete({ _id: postId }, { new: true });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } },
          { new: true }
        )
          .select("-__v -password")
          .populate({
            path: "orders.courses",
            populate: "category",
          })
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })
          .populate("courses")
          .populate("blueprints")
          .populate("posts");

        return User;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteCommentPost: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        ).populate("comments");
        await Comment.findByIdAndDelete({
          _id: commentId,
        });

        return updatedPost;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteBlueprintReview: async (
      parent,
      { blueprintId, reviewId },
      context
    ) => {
      if (context.user) {
        await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          { $pull: { reviews: { _id: reviewId } } },
          { new: true }
        ).populate("reviews");
        await Review.findByIdAndDelete({
          _id: reviewId,
        });

        return Blueprint;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteCourseReview: async (parent, { courseId, reviewId }, context) => {
      if (context.user) {
        await Course.findByIdAndUpdate(
          { _id: courseId },
          { $pull: { reviews: { _id: reviewId } } },
          { new: true }
        ).populate("reviews");
        await Review.findByIdAndDelete({
          _id: reviewId,
        });

        return Course;
      }
    },
  },
};

module.exports = resolvers;
