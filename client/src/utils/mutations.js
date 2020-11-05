import gql from "graphql-tag";

//sign up user
export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
  ) {
    addUser(
      username: $username,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
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
  mutation addOrder($courses: [ID]!, $blueprints: [ID]!) {
    addOrder(courses: $courses, blueprints: $blueprints) {
      purchaseDate
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
      blueprints {
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
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
  ) {
    updateUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password
    ) {
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
          quantity
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
          image
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
            image
          }
        }
      }
    }
  }
`;

// add blueprint to Database under user info - separate page
export const ADD_BLUEPRINT = gql`
  mutation addBlueprint(
    $name: String!,
    $description: String!,
    $image: String,
    $file: String,
    $price: Float!,
    $difficulty: String!,
    $category: ID!,
  ) {
    addBlueprint(
      name: $name,
      description: $description,
      image: $image,
      file: $file,
      price: $price,
      difficulty: $difficulty,
      category: $category
    ) {
      _id
      name
      description
      image
      file
      price
      difficulty
      category {
        _id
        name
      }
      username
    }
  }
`;
// add single course to database
export const ADD_COURSE = gql`
    mutation addCourse($name: String!, $description: $String!, $price: Float!, $classTime: String!, $items: String!, $category: ID!) {
        addClass(name: $name, description: $description, price: $price, classTime: $classTime, difficulty: $difficulty, items: $items, category: $category) {
            _id
            name
            description
            price
            classTime
            difficulty
            items
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

//add course review to database, on a single course page
export const ADD_REVIEW_COURSE = gql`
  mutation addCourseReview($courseId: ID!, $commentBody: String!) {
    addCourseReview(courseId: $courseId, commentBody: $commentBody) {
      _id
      name
      username
      description
      price
      courseTime
      difficulty
      items
      category {
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

//add blueprint review to database, on a single blueprint page
export const ADD_REVIEW_BLUEPRINT = gql`
  mutation addBlueprintReview($blueprintId: ID!, $commentBody: String!) {
    addBlueprintReview(blueprintId: $courseId, commentBody: $commentBody) {
      _id
      name
      username
      description
      image
      file
      price
      difficulty
      category {
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
export const UPDATE_COURSE_INFO = gql`
  mutation updateCourse( $courseId: ID!, $name: String!, $description: String!, $courseTime: String!, $difficulty: String!, $price: Float! $items: String!,) {
    updateCourse(
      courseId: $courseId,
      name: $name,
      description: $description,
      courseTime: $courseTime,
      difficulty: $difficulty,
      price: $price,
      items: $items
    ) {
      _id
      name
      username
      description
      price
      courseTime
      difficulty
      items
      category {
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

//update blueprint information on an update page
export const UPDATE_BLUEPRINT_INFO = gql`
  mutation updateBlueprint( $blueprintId: ID!, $name: String!, $description: String!, $difficulty: String!, $price: Float!) {
    updateBlueprint(
      blueprintId: $blueprintId,
      name: $name,
      description: $description,
      difficulty: $difficulty,
      price: $price,
    ) {
      _id
      name
      username
      description
      price
      difficulty
      category {
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
    mutation updatePost($postId: ID!, $title: String!, $postText: String!, $category: ID!) {
        updatePost(postId: $postId, title: $title, postText: $postText, category: $category) {
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

export const ADD_COMMENT_POST = gql`
    mutation addCourseReview($courseId: ID!, $reviewBody: String!) {
        addCourseReview(courseId: $courseId, reviewBody: $reviewBody) {
            _id
            name
            reviewBody
            username{
                _id
            }
        }
    }

`;

