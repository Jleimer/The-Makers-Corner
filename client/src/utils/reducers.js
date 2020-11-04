import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART,
} from "./actions";

const initialState = {
    blueprints: [],
    courses: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            console.log(action.type);
            return {
                ...state,
                products: [...action.products],
            };

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

        case ADD_TO_CART:
            console.log(action.type);
            return {
                ...state,
                cartOpen: true,
                    cart: [...state.cart, action.product],
            };

        // case ADD_MULTIPLE_TO_CART:
        //     console.log(action.type);
        //     return {
        //         ...state,
        //         cart: [...state.cart, ...action.products],
        //     };

        case REMOVE_FROM_CART:
            console.log(action.type);
            let newState = state.cart.filter((product) => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                    cart: newState,
            };
        //later date
        // case UPDATE_CART_QUANTITY:
        //     console.log(action.type);
        //     return {
        //         ...state,
        //         cartOpen: true,
        //             cart: state.cart.map((product) => {
        //                 if (action._id === product._id) {
        //                     product.purchaseQuantity = action.purchaseQuantity;
        //                 }
        //                 return product;
        //             }),
        //     };

        case CLEAR_CART:
            console.log(action.type);
            return {
                ...state,
                cartOpen: false,
                    cart: [],
            };

        case TOGGLE_CART:
            console.log(action.type);
            return {
                ...state,
                cartOpen: !state.cartOpen,
            };

        default:
            return state;
    }
};

export default reducer;