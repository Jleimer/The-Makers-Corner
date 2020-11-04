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

export const ADD_POST = gql`
    mutation addPost($postText: String!, $title: String!, $category: String!) {
        addPost(postText: $postText, title: $title, category: $category) {
            _id
            postText
            createdAt
            username
        }
    }
`;

export const ADD_BLUEPRINT = gql`
    mutation addBlueprint($name: String!, $description: String!, $image: String, $file: String, $price: Float!, $difficulty: String!, $category: String!) {
        addBlueprint(name: $name, description: $description, image: $image, file: $file, price: $price, difficulty: String!, category: String!) {
            _id
            name
            username
            
        }
    }
`;

export const ADD_CLASS = gql`
    mutation addClass($name: String!, $description: $String!, $price: Float!, $classTime: String!, $items: String!, $category: String!) {
        addClass(name: $name, description: $description, price: $price, classTime: $classtime, difficulty: $difficulty, items: $items, category: $category) {
            _id
            name
            username
        }
    }
`;


