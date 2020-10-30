const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type: Category {
        _id: ID
        name: String
    }

    type BluePrint {
        _id: ID
        name: String
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
        name: String
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
        ddUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addOrder(classes:[ID!], blueprints[ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        deleteBlueprint(_id: ID!): BluePrint
        deleteClass(_id: ID!): Class
        addBlueprint(name: String!, description: String!, username: String!, image: String!, file: String!, price: Number!, difficulty: String!, category: String!): Blueprint
        addClass(name: String!, username: String!, description: String!, price: Number!, classTime: String!, difficulty: String!, items: String!, category: String!): Class
        
    }

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;
