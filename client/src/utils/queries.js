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
        }
      }
    }
  }
`;

export const QUERY_ORDER_HISTORY = gql`
   {
      user {
        orders {
          blueprints {
            _id
            name
            price
            purchaseDate
          }
          courses {
            _id
            name
            price
            purchaseDate
          }
        }
      }
    }
`;

//checking out with items in the cart
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
      image
      difficulty
      category {
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
export const QUERY_SINGLE_BLUEPRINT = gql`
  query blueprint($blueprintId: ID!) {
    blueprint(blueprintId: $blueprintId) {
      _id
      username
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

// returns single course
export const QUERY_SINGLE_COURSE = gql`
  query course($courseId: ID!) {
    course(courseId: $courseId) {
      _id
      username
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
