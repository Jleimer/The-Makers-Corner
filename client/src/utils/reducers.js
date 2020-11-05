import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_COMMENT,
  ADD_REVIEW,
  UPDATE_BLUEPRINTS,
  UPDATE_COURSES,
  UPDATE_POSTS,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART,
//   UPDATE_CART_QUANTITY,
  CLEAR_CART,
} from "./actions";

const initialState = {
  blueprints: [],
  courses: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      console.log(action);
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      console.log(action);
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    case ADD_COMMENT:
      console.log(action);
      return {
        ...state,
        posts: [...state.posts, action.comments],
      };

    case ADD_REVIEW:
      console.log(action);
      return {
        ...state,
        blueprints: [...state.blueprints, action.reviews],
        courses: [...state.courses, action.reviews],
      };

    case UPDATE_BLUEPRINTS:
      console.log(action);
      return {
        ...state,
        blueprints: [...action.blueprints],
      };

    case UPDATE_COURSES:
      console.log(action);
      return {
        ...state,
        courses: [...action.courses],
      };

    case UPDATE_POSTS:
        console.log(action)
      return {
        ...state,
        posts: [...action.posts],
      };

    case ADD_TO_CART:
      console.log(action);
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.blueprints, action.courses],
      };

    case ADD_MULTIPLE_TO_CART:
      console.log(action);
      return {
        ...state,
        cart: [...state.cart, ...action.blueprints, ...action.courses],
      };

    case REMOVE_FROM_CART:
        console.log(action);
        let blueprintState = state.cart.blueprints.filter((blueprints) => {
            return blueprints._id !== action._id;
        });
        let courseState = state.cart.courses.filter((courses) => {
            return courses._id !== action._id;
        });

        return {
            ...state,
            cartOpen: blueprintState.length > 0 || courseState.length > 0,
                cart: [...state.cart, blueprintState, courseState]
        };

    case TOGGLE_CART:
      console.log(action);
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    // case UPDATE_CART_QUANTITY:
    //   console.log(action.type);
    //   return {
    //     ...state,
    //     cartOpen: true,
    //     cart: state.cart.blueprints.map((blueprints) => {
    //       if (action._id === blueprints._id) {
    //         blueprints.purchaseQuantity = action.purchaseQuantity;
    //       }
    //       return blueprints;
    //     }),
    //   };

    case CLEAR_CART:
        console.log(action);
        return {
            ...state,
            cartOpen: false,
                cart: [],
        };

    default:
      return state;
  }
};

export default reducer;
