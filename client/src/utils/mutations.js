import gql from "graphql-tag";

//sign up user
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//add's item to the order for checkout
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        category {
          _id
          name
        }
        group {
          _id
          name
        }
      }
    }
  }
`;

//logs the user in
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// allows user to change their name/username/email/ and need their password to do so
export const UPDATE_USER_INFO = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      user {
        firstName
        lastName
        username
        products {
          _id
          name
          description
          username
          price
          category {
            _id
            name
          }
          type {
            _id
            name
          }
          review {
            reviewBody
            username
            createdAt
            _id
          }
        }
        posts {
          _id
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
        orders {
          _id
          purchaseDate
          products {
            _id
            name
            description
            price
            image
            group {
              _id
              name
            }
          }
        }
      }
    }
  }
`;

// add blueprint to Database under user info - separate page
export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $image: String
    $file: String
    $price: Float!
    $difficulty: String!
    $category: ID!
    $items: String!
    $courseTime: String
    $group: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      image: $image
      file: $file
      price: $price
      difficulty: $difficulty
      category: $category
      items: $items
      group: $group
    ) {
      _id
      name
      description
      image
      file
      price
      difficulty
      items
      group {
        _id
        name
      }
      category {
        _id
        name
      }
      username
    }
  }
`;

// add post to database under user info - separate page
export const ADD_POST = gql`
  mutation addPost($postText: String!, $title: String!, $category: String!) {
    addPost(postText: $postText, title: $title, category: $category) {
      _id
      postText
      title
      category {
        _id
        name
      }
      username
      createdAt
    }
  }
`;

// add a comment to a post - single page post to add comment
export const ADD_COMMENT_POST = gql`
  mutation addCommentPost($commentBody: String!) {
    addCommentPost(commentBody: $commentBody) {
      _id
      postText
      createdAt
      username
      comments {
        _id
        username
        createdAt
        commentBody
      }
    }
  }
`;

//add course review to database, on a single product page
export const ADD_PRODUCT_REVIEW = gql`
  mutation addProductReview($productId: ID!, $commentBody: String!) {
    addProductReview(productId: $productId, commentBody: $commentBody) {
      _id
      name
      username
      description
      price
      courseTime
      difficulty
      items
      image
      category {
        _id
        name
      }
      group {
        _id
        name
      }
      reviews {
        _id
        username
        reviewBody
        createdAt
      }
    }
  }
`;

//update course information on an update page
export const UPDATE_PRODUCT_INFO = gql`
  mutation updateProduct(
    $productId: ID!
    $name: String!
    $description: String!
    $courseTime: String!
    $difficulty: String!
    $price: Float!
    $items: String!
    $group: ID!
    $image: String
  ) {
    updateProduct(
      productId: $productId
      name: $name
      description: $description
      courseTime: $courseTime
      difficulty: $difficulty
      price: $price
      items: $items
      group: $group
      image: $image
    ) {
      _id
      name
      username
      description
      price
      courseTime
      difficulty
      items
      image
      category {
        _id
        name
      }
      group {
        _id
        name
      }
      reviews {
        _id
        username
        reviewBody
        createdAt
      }
    }
  }
`;

// update post information on an update page
export const UPDATE_POST_INFO = gql`
  mutation updatePost(
    $postId: ID!
    $title: String!
    $postText: String!
    $category: ID!
  ) {
    updatePost(
      postId: $postId
      title: $title
      postText: $postText
      category: $category
    ) {
      _id
      postText
      createdAt
      username
      comments {
        _id
        username
        createdAt
        commentBody
      }
    }
  }
`;
