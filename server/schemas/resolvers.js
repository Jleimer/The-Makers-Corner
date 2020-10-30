const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type: Category {
        _id: ID
        name: String
    }

    type BluePrint {
        _id: ID
        name: String
        description: String
        image: String
        file: String
        price: Number
        difficulty: String
        category: String
    }

    type Class {
        _id: ID
        name: String
        description: String
        price: Number
        classTime: String
        difficulty: String
        items: String
        category: String
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
    

`;