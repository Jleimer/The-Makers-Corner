import gql from 'graphql-tag';

export const QUERY_COURSES = gql`
  query getCourse($category: ID) {
    courses(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_COURSES = gql`
  {
    courses {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      blueprints {
        _id
        name
        description
        price
        quantity
        image
      }
      courses {
        _id
        name
        description
        price
        quantity
        image
      }
    }
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query comments($username: String) {
    comments(username: $username) {
      _id
      commentText
      createdAt
      username
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_BLUEPRINTS = gql`
  query getBlueprints($category: ID) {
    blueprints(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_BLUEPRINTS = gql`
  {
    blueprints {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;
