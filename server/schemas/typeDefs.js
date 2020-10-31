const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type: Category {
        _id: ID
        name: String
    }

    type BluePrint {
        _id: ID
        title: String
        description: String
        username: String
        image: String
        file: String
        price: Number
        difficulty: String
        category: String
        reviews: [ReviewSchema]
    }

    type Class {
        _id: ID
        title: String
        username: String
        description: String
        price: Number
        classTime: String
        difficulty: String
        items: String
        category: String
        reviews: [ReviewSchema]
    }

    type Order {
        _id: ID
        purchaseDate: String
        classes: [Class]
        blueprints: [Blueprint]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        username: String
        orders: [Order]
        posts: [Post]
        classes: [Class]
        blueprints: [Blueprint]
    }

    type: Post {
        _id: ID
        postText: String
        title: String
        createdAt: String
        username: String
        comments: [CommentSchema]
    }
    
    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        blueprints(category: ID, name: String): [Blueprint]
        blueprint(_id: ID!): Blueprint
        classes(category: ID, name: String): [Class]
        class(_id: ID!): Class
        user: User
        order(_id: ID!): Order
        checkout(classes: [ID]!, blueprints: [ID]!): Checkout
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addOrder(classes:[ID!], blueprints[ID]!): Order
        login(email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        addBlueprint(title: String!, description: String!, image: String!, file: String!, price: Number!, difficulty: String!, category: String!): Blueprint
        addClass(title: String!, description: String!, price: Number!, classTime: String!, difficulty: String!, items: String!, category: String!): Class
        addPost(postText: String!, title: String!): Post
        addComment(postId: ID!, commentBody: String!): Post
        addClassReview(classId: ID!, reviewBody: String!): Class
        addBlueprintReview(blueprintId: ID!, reviewBody: String!): Blueprint
        updateClass(classId: ID!, title: String!, description: String!, price: Number, items: String!): Class
        updateBlueprint(blueprintId: ID!, title: String!, description: String!, prince: Number): Blueprint
        deleteBlueprint(blueprintId: ID!): BluePrint
        deleteClass(classId: ID!): Class
        deletePost(postId: ID!): Post
        deleteComment(postId: ID!, commentId: ID!): Post
        deleteBlueprintReview(blueprintId: ID!, reviewId: ID!): Blueprint
        deleteClassReview(blueprintId: ID!, reviewId: ID!): Class
    }

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;