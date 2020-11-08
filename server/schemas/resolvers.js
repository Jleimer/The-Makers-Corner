const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Post,
  Category,
  Type,
  Product,
  Order,
  Comment,
  Review,
} = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    type: async () => {
      return await Type.find();
    },
    products: async (parent, { category, type, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (type) {
        params.type = type;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params)
        .populate("category")
        .populate("reviews")
        .populate("type")
        .sort({ createdAt: -1 });
    },
    product: async (parent, { productId }) => {
      return await Product.findById({ _id: productId })
        .populate("category")
        .populate("reviews")
        .populate("type");
    },
    blueprints: async (parent, { category, type, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (type) {
        params.type = type;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params)
        .populate("category")
        .populate("reviews")
        .populate("type")
        .sort({ createdAt: -1 });
    },
    courses: async (parent, { category, type, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }

      if (type) {
        params.type = type;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params)
        .populate("category")
        .populate("reviews")
        .populate("type")
        .sort({ createdAt: -1 });
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
            path: "orders.products",
            populate: "category",
          })
          .populate({
            path: "products",
            populate:{ path: 'category'}
          })
          .populate({
            path: "posts",
            populate:{ path: 'category'}
          })
          

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, { username }, context) => {
      if (context.user) {
        const user = await User.findById(username)
          .select("-__v -password")
          .populate({
            path: "products",
            populate:{ path: 'category'}
          })
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
            path: "orders.products",
            populate: "category",
          })
        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const { products } = await order.populate("products").execPopulate();

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
    orderHistory: async (parent, args, context) => {
      if (context.user) {
        await User.findById(context.user._id)
          .select("-password")
          .populate({
            path: "orders.products",
            populate: "category",
          })
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
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
    addProduct: async (parent, args, context) => {
      if (context.user) {
        let newProduct = await (
          await Product.create({ ...args, username: context.user.username })
        )
        newProduct = await newProduct.populate("category").execPopulate();

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { products: newProduct._id } },
          { new: true }
        );

        return newProduct;
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
    addProductReview: async (parent, { productId, args }, context) => {
      if (context.user) {
        const newReview = await Review.create({
          ...args,
          username: context.user.username,
        });

        await Product.findByIdAndUpdate(
          { _id: productId },
          { $push: { reviews: newReview._id } },
          { new: true }
        ).populate("reviews");

        return Product;
      }
      throw new AuthenticationError("Not logged in!");
    },
    updateProduct: async (parent, { productId, ...args }, context) => {
      if (context.user) {
        return await Product.findByIdAndUpdate({ _id: productId }, args, {
          new: true,
        }).populate("reviews").populate("category").populate("type");
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
    deleteProduct: async (parent, { productId }, context) => {
      if (context.user) {
        await Product.findByIdAndDelete({ _id: productId });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { products: productId } },
          { new: true }
        )
          .select("-__v -password")
          .populate({
            path: "orders.products",
            populate: "category",
          })
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
            path: "orders.products",
            populate: "category",
          })
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
    deleteProductReview: async (
      parent,
      { productId, reviewId },
      context
    ) => {
      if (context.user) {
        await Product.findByIdAndUpdate(
          { _id: productId },
          { $pull: { reviews: { _id: reviewId } } },
          { new: true }
        ).populate("reviews");
        await Review.findByIdAndDelete({
          _id: reviewId,
        });

        return Product;
      }

      throw new AuthenticationError("Not logged in!");
    },
  },
};

module.exports = resolvers;
