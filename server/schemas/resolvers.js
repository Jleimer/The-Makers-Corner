const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Category, Class, Blueprint, Order } = require("../models");
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
      return await Blueprint.find(params).populate("category").sort({ createdAt: -1 });
    },
    blueprint: async (parent, { _id }) => {
      return await Blueprint.findById(_id).populate("category");
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
      return await Class.find(params).populate("category").sort({ createdAt: -1 });
    },
    class: async (parent, { _id }) => {
      return await Class.findById(_id).populate("category");
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
      return await Post.find(params).populate("category").populate("comments").sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return await Post.findById(_id).populate("category").populate("comments");
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
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.blueprints",
          populate: "category",
        })
        .populate({
          path: "orders.classes",
          populate: "category",
        })
        ;

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ classes: args.classes, blueprints: args.blueprints });
      const { products } = await order.populate("blueprints").populate("classes").execPopulate();

      const line_items = [];
      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
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
        success_url:
          `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { session: session.id};
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
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in!");
    },
    addBlueprint: async (parent, args, context) => {
      if (context.user) {
        const newBlueprint = await Blueprint.create(...args, {
          username: context.user.username,
        });

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
        const newClass = await Class.create(...args, {
          username: context.user.username,
        });

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
        const newPost = await Post.create(...args, {
          username: context.user.username,
        });

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
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const postComment = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true }
        ).populate("comments");
        return postComment;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addClassReview: async (parent, { classId, reviewBody }, context) => {
      if (context.user) {
        const classReview = await Class.findByIdAndUpdate(
          { _id: classId },
          {
            $push: {
              reviews: { reviewBody, username: context.user.username },
            },
          },
          { new: true }
        ).populate("reviews");
        return classReview;
      }
      throw new AuthenticationError("Not logged in!");
    },
    addBlueprintReview: async (parent, { classId, reviewBody }, context) => {
      if (context.user) {
        const blueprintReview = await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          {
            $push: {
              reviews: { reviewBody, username: context.user.username },
            },
          },
          { new: true }
        ).populate("reviews");
        return blueprintReview;
      }
      throw new AuthenticationError("Not logged in!");
    },
    updateClass: async (parent, { classId, args }, context) => {
      if (context.user) {
        return await Class.findByIdAndUpdate({ _id: classId }, ...args, {
          new: true,
        })
        .populate("reviews");
      }

      throw new AuthenticationError("Not logged in!");
    },
    updateBlueprint: async (parent, { blueprintId, args }, context) => {
      if (context.user) {
        return await Blueprint.findByIdAndUpdate(
          { _id: blueprintId },
          ...args,
          { new: true }
        ).populate("reviews");
      }
      throw new AuthenticationError("Not logged in!");
    },
    updatePost: async (parent, { postId, args }, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate(
          { _id: blueprintId },
          ...args,
          { new: true }
        ).populate("comments");
      }
      throw new AuthenticationError("Not logged in!");
    },
    deleteBlueprint: async (parent, { blueprintId }, context) => {
      if (context.user) {
        return await Blueprint.findByIdAndDelete( {_id: blueprintId}, {new:true});
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteClass: async (parent, { classId }, context) => {
      if (context.user) {
        return await Class.findByIdAndDelete( {_id: classId}, {new:true});
      }

      throw new AuthenticationError("Not logged in!");
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        return await Post.findByIdAndDelete( {_id: postId}, {new:true});
      }

      throw new AuthenticationError("Not logged in!");
    },
    deleteComment: async (parent, {postId, commentId}, context) => {
      if (context.user) {
        return await Post.findById(
          { _id: postId},
          { $pull: { comments: { commentId: commentId}}},
          { new: true}
          )
          .populate("comments");
      }
      throw new AuthenticationError("Not logged in!")
    },
    deleteBlueprintReview: async (parent, {blueprintId, reviewId}, context) => {
      if (context.user) {
        return await Blueprint.findById(
          { _id: blueprintId},
          { $pull: { reviews: { reviewId: reviewId}}},
          { new: true}
          )
          .populate("reviews");
      }
      throw new AuthenticationError("Not logged in!")
    },
    deleteClassReview: async (parent, {classId, reviewId}, context) => {
      if (context.user) {
        return await Class.findById(
          { _id: classId},
          { $pull: { reviews: { reviewId: reviewId}}},
          { new: true}
          )
          .populate("reviews");
      }
      throw new AuthenticationError("Not logged in!")
    },
  },
};

module.exports = resolvers;
