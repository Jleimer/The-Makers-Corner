import gql from "graphql-tag";

export const QUERY_COURSES = gql`
  query course($category: ID, $name: String) {
    courses(category: $category, name: $name) {
      _id
      name
      description
      price
      image
      category {
        name
        _id
        name
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
      category {
        _id
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
          image
        }
        courses {
          _id
          name
          description
          price
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

// export const QUERY_COMMENTS = gql`
//   query comments($username: String) {
//     comments(username: $username) {
//       _id
//       commentText
//       createdAt
//       username
//     }
//   }
// `;

export const QUERY_ALL_POSTS = gql`
  {
    posts {
      title
      postText
      username
      createdAt
      comments {
        commentBody
        username
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
query post($postId: ID!) {
  post(postId: $postId){
    title
      postText
      username
      createdAt
      comments {
        commentBody
        username
        createdAt
      }
  }
}
`;

export const QUERY_ME = gql`
  {
    user {
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

export const QUERY_CATEGORY_BLUEPRINTS = gql`
  query blueprints($category: ID, $name: String) {
    blueprints(category: $category, name: $name) {
      _id
      name
      description
      price
      file
      image
      category {
        _id
        name
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
        _id
        name
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
