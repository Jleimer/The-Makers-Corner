import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_ORDER = gql`
    mutation addOrder(classes:[ID]!, blueprints: [ID]!) {
        addOrder(classes: $classes, blueprints: $blueprints) {
            purchaseDate
            classes {
                _id
                name
                description
                price
                category {
                    name
                }
            }
            blueprints {
                _id
                name
                description
                price
                category {
                    name
                }
            }
        }
    }
`;

export const ADD_COMMENT = gql`
    muuation addComment($commentText: String!) {
        addComment(commentText: $commentText) {
            _id
            commentText
            createdAt
            username
        }
    }
`;

