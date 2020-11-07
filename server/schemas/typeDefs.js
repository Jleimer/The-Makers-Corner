const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Category {
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

    type Blueprint {
        _id: ID
        name: String
        username: String
        description: String
        image: String
        file: String
        price: Float
        difficulty: String
        category: Category
        reviews: [Review]
        
    }

    type Course {
        _id: ID
        name: String
        username: String
        description: String
        price: Float
        courseTime: String
        difficulty: String
        items: String
        category: Category
        reviews: [Review]
        
    }

    type Order {
        _id: ID
        purchaseDate: String
        courses: [Course]
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
        courses: [Course]
        blueprints: [Blueprint]
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
        blueprints(category: ID, name: String): [Blueprint]
        blueprint(blueprintId: ID!): Blueprint
        courses(category: ID, name: String): [Course]
        course(courseId: ID!): Course
        posts(category: ID, name: String): [Post]
        post(postId: ID!): Post
        user(username: String!): User
        users: [User]
        me: User
        order(_id: ID!): Order
        checkout(courses: [ID]!, blueprints: [ID]!): Checkout
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): Auth
        addOrder(courses:[ID]!, blueprints: [ID]!): Order
        login(email: String!, password: String!): Auth
        updateUser(firstName: String!, lastName: String!, email: String!, password: String!): User
        addBlueprint(name: String!, description: String!, image: String, file: String, price: Float!, difficulty: String!, category: ID!): Blueprint
        addCourse(name: String!, description: String!, price: Float!, courseTime: String!, difficulty: String!, items: String!, category: ID!): Course
        addPost(postText: String!, title: String!, category: ID!): Post
        addCommentPost(postId: ID!, commentBody: String!): Post
        addCourseReview(courseId: ID!, reviewBody: String!): Course
        addBlueprintReview(blueprintId: ID!, reviewBody: String!): Blueprint
        updateCourse(courseId: ID!, name: String!, description: String!, courseTime: String!, difficulty: String!, price: Float!, items: String!): Course
        updateBlueprint(blueprintId: ID!, name: String!, description: String!, difficulty: String!, price: Float!): Blueprint
        updatePost(postId: ID!, title: String!, postText: String!, category: ID!): Post
        deleteBlueprint(blueprintId: ID!): Blueprint
        deleteCourse(courseId: ID!): Course
        deletePost(postId: ID!): Post
        deleteCommentPost(postId: ID!, commentId: ID!): Post
        deleteBlueprintReview(blueprintId: ID!, reviewId: ID!): Blueprint
        deleteCourseReview(blueprintId: ID!, reviewId: ID!): Course
    }

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;