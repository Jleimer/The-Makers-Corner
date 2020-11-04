const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Post,
  Category,
  Class,
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
      return await Blueprint.findById({_id: blueprintId}).populate("category").populate("reviews");
    },
    classes: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Class.find(params)
        .populate("category")
        .populate("reviews")
        .sort({ createdAt: -1 });
    },
    class: async (parent, { classId }) => {
      return await Class.findById({_id: classId}).populate("category").populate("reviews");
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
      return await Post.findById({_id: postId}).populate("category").populate("comments");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({
            path: "orders.classes",
            populate: "category",
          })
          .populate({
            path: "orders.blueprints",
            populate: "category",
          })

          .populate("classes")
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
            path: "orders.classes",
            populate: "category",
          });
        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({
        classes: args.classes,
        blueprints: args.blueprints,
      });
      const { classes, blueprints } = await order
        .populate("blueprints")
        .populate("classes")
        .execPopulate();
      const products = classes.concat(blueprints);

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
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { blueprints, classes }, context) => {
      if (context.user) {
        const order = new Order({ blueprints, classes });
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
        return await User.findByIdAndUpdate({_id: context.user._id}, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in!");
    },
    addBlueprint: async (parent, args, context) => {
      if (context.user) {
        const newBlueprint = await (await Blueprint.create({ ...args, username: context.user.username })).populate("category");

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { blueprints: newBlueprint._id } },
          { new: true }
        );

        return newBlueprint;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addClass: async (parent, args, context) => {
      if (context.user) {
        const newClass = await Class.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { classes: newClass._id } },
          { new: true }
        );

        return newClass;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const newPost = await Post.create({ ...args, username: context.user.username });

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
        const newComment = await Comment.create({ ...args, username: context.user.username });

        await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: newComment._id } },
          { new: true }
        ).populate("comments");

        return;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addClassReview: async (parent, { classId, args }, context) => {
      if (context.user) {
        const newReview = await Review.create({ ...args, username: context.user.username });

        await Class.findByIdAndUpdate(
          { _id: classId },
          { $push: { reviews: newReview._id } },
          { new: true }
        ).populate("reviews");

        return Class;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addBlueprintReview: async (parent, { blueprintId, args }, context) => {
      if (context.user) {
        const newReview = await Review.create({ ...args, username: context.user.username });

        await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          { $push: { reviews: newReview._id } },
          { new: true }
        ).populate("reviews");

        return Blueprint;
      }
      throw new AuthenticationError("Not logged in!");
    },
    updateClass: async (parent, {classId, ...args}, context) => {
      if (context.user) {
        return await Class.findByIdAndUpdate({_id: classId}, args, {
          new: true,
        }).populate("reviews");
      }

      throw new AuthenticationError("Not logged in!");
    },
    updateBlueprint: async (parent, { blueprintId, ...args }, context) => {
      if (context.user) {
        return await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          args,
          { new: true }
        ).populate("reviews");
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
        return await Blueprint.findByIdAndDelete(
          { _id: blueprintId },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteClass: async (parent, { classId }, context) => {
      if (context.user) {
        return await Class.findByIdAndDelete({ _id: classId }, { new: true });
      }

      throw new AuthenticationError("Not logged in!");
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        return await Post.findByIdAndDelete({ _id: postId }, { new: true });
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
        await Comment.findByIdAndDelete(
          {
            _id: commentId,
          }
        );

        return updatedPost;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteBlueprintReview: async (parent, { blueprintId, reviewId }, context) => {
      if (context.user) {
        await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          { $pull: { reviews: { _id: reviewId } } },
          { new: true }
        ).populate("reviews");
        await Review.findByIdAndDelete(
          {
            _id: reviewId,
          }
        );

        return Blueprint;
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteClassReview: async (parent, { classId, reviewId }, context) => {
      if (context.user) {
        await Class.findByIdAndUpdate(
          { _id: classId },
          { $pull: { reviews: { _id: reviewId } } },
          { new: true }
        ).populate("reviews");
        await Review.findByIdAndDelete(
          {
            _id: reviewId,
          }
        );

        return Class;
      }
    },
  },
};

module.exports = resolvers;
