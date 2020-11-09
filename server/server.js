const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

