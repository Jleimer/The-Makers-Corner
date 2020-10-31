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
      return await Blueprint.find(params).populate("category");
    },
    blueprint: async (parent, { _id }) => {},
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
      return await Class.find(params).populate("category");
    },
    class: async (parent, { _id }) => {},
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, args, context) => {},
    checkout: async (parent, args, context) => {},
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  },
};
