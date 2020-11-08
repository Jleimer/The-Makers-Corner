import gql from "graphql-tag";

//queries the category IDs and name
export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query products($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
      type {
        name
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        _id
        name
      }
      type {
        _id
        name
      }
    }
  }
`;

//returns the single user info - shows that user dashboard
export const QUERY_SINGLE_USER = gql`
  {
    token
    user {
      firstName
      lastName
      username
      blueprints {
        _id
        name
        description
        username
        price
        category {
          _id
          name
        }
      }
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
    }
  }
`;

//returns just the person logged in - dashboard
export const QUERY_ME = gql`
  {
    me {
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
        }
        
      }
    }
  }
`;

export const QUERY_ORDER_HISTORY = gql`
   {
      user {
        orders {
          products{
            _id
            name
            price
            purchaseDate
        }
      }
    }
 }`;

export const QUERY_CHECKOUT = gql`
  query checkout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

//filter blueprints by category
export const QUERY_CATEGORY_BLUEPRINTS = gql`
  query blueprints($category: ID, $name: String) {
    blueprints(category: $category, name: $name) {
      _id
      name
      description
      username
      price
      file
      difficulty
      category {
        _id
        name
      }
      type {
        _id
        name
      }
    }
  }
`;

//returns all blueprints - unfiltered
export const QUERY_ALL_BLUEPRINTS = gql`
  {
    blueprints {
      _id
      name
      description
      username
      price
      category {
        _id
        name
      }
    }
  }
`;

// returns single blueprint
export const QUERY_SINGLE_PRODUCT = gql`
  query product($productId: ID!) {
    product(productId: $productId) {
      _id
      username
      name
      description
      price
      category {
        _id
        name
      }
      type {
        _id
        name
      }
    }
  }
`;

// using the category ID or name to filter the courses
export const QUERY_CATEGORY_COURSES = gql`
  query courses($category: ID, $name: String) {
    courses(category: $category, name: $name) {
      _id
      name
      description
      username
      price
      image
      difficulty
      category {
        _id
        name
      }
    }
  }
`;

// returns all courses - unfiltered
export const QUERY_ALL_COURSES = gql`
  {
    courses {
      _id
      name
      description
      username
      price
      category {
        _id
        name
      }
    }
  }
`;

// // returns single course
// export const QUERY_SINGLE_COURSE = gql`
//   query course($courseId: ID!) {
//     course(courseId: $courseId) {
//       _id
//       username
//       name
//       description
//       price
//       category {
//         _id
//         name
//       }
//     }
//   }
// `;

//queries all of the posts -unfiltered - use for messageboard
export const QUERY_ALL_POSTS = gql`
  {
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
  }
`;

//single post page using postId
export const QUERY_SINGLE_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
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
  }
`;
