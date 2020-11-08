const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Type {
        _id: ID
        name: String
    }

    type Review {
        _id: ID
        reviewBody: String
        username: String
        createdAt: String
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Product {
        _id: ID
        name: String
        username: String
        description: String
        image: String
        file: String
        price: Float
        difficulty: String
        items: String
        courseTime: String
        category: Category
        reviews: [Review]
        
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        username: String
        orders: [Order]
        posts: [Post]
        products: [Product]
    }

    type Post {
        _id: ID
        postText: String
        title: String
        createdAt: String
        username: String
        comments: [Comment]
        category: Category
    }
    
    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        type: [Type]
        products(categroy: ID, type: ID, name: String): [Product]
        product(productId: ID!): Product
        blueprints(category: ID, type: ID, name: String): [Product]
        courses(type: ID, category: ID, name: String): [Product]
        posts(category: ID, name: String): [Post]
        post(postId: ID!): Post
        user(username: String!): User
        users: [User]
        me: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
        orderHistory: User
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): Auth
        addOrder(products:[ID]!): Order
        login(email: String!, password: String!): Auth
        updateUser(firstName: String!, lastName: String!, email: String!, password: String!): User
        
        addProduct(name: String!, description: String!, image: String, file: String, price: Float!, difficulty: String!,courseTime: String, items: String!, type: ID!, category: ID!): Product
    
        addPost(postText: String!, title: String!, category: ID!): Post
        addCommentPost(postId: ID!, commentBody: String!): Post
        addProductReview(productId: ID!, reviewBody: String!): Product
        
        updateProduct(productId: ID!, name: String!, description: String!, image: String, file: String, price: Float!, difficulty: String!, courseTime: String, items: String!, type: ID!, category: ID!): Product
        updatePost(postId: ID!, title: String!, postText: String!, category: ID!): Post
        deleteProduct(productId: ID!): Product

        deletePost(postId: ID!): Post
        deleteCommentPost(postId: ID!, commentId: ID!): Post
        deleteProductReview(productId: ID!, reviewId: ID!): Product

    }

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;