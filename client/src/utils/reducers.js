import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_COMMENT,
  ADD_REVIEW,
  UPDATE_POSTS,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  UPDATE_PRODUCTS,
} from "./actions";

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      console.log(action.type);
      return {
        ...state,
        products: [action.products],
      };
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      console.log(action.type);
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      console.log(action.type);
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
        products: [...state.products, action.reviews],
      };

    case UPDATE_POSTS:
      console.log(action);
      return {
        ...state,
        posts: [...action.posts],
      };

    case ADD_TO_CART:
      console.log(action.type);
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      console.log(action.type);
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case TOGGLE_CART:
      console.log(action);
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

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
