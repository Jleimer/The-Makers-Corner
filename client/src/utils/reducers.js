import {
    UPDATE_BLUEPRINTS,
    UPDATE_COURSES,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    TOGGLE_CART,
} from "./actions";

const initialState = {
    blueprints: [],
    courses: [],
    cart: [],
    cartOpen: false,
    //categories: [],
    //currentCategory: "",
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BLUEPRINTS:
            console.log(action.type);
            return {
                ...state,
                //blueprints: [...action.blueprints],
            };

        case UPDATE_COURSES:
            console.log(action.type);
            return {
                ...state,
                //courses: [...action.courses],
            };

        case UPDATE_CART_QUANTITY:
            console.log(action.type);
            return {
                ...state,
                //currentCategory: action.currentCategory,
            };

        case ADD_TO_CART:
            console.log(action.type);
            return {
                ...state,
                // cartOpen: true,
                //     cart: [...state.cart, action.blueprints, action.courses],
            };

        // case ADD_MULTIPLE_TO_CART:
        //     console.log(action.type);
        //     return {
        //         ...state,
        //         cart: [...state.cart, ...action.products],
        //     };

        // case REMOVE_FROM_CART:
        //     console.log(action.type);
        //     let blueprintState = state.cart.filter((blueprints) => {
        //         return blueprints._id !== action._id;
        //     });
        //     let courseState = state.cart.filter((courses) => {
        //         return courses._id !== action._id;
        //     });

        //     return {
        //         ...state,
        //         cartOpen: blueprintState.length > 0 || courseState.length > 0,
        //             cart: newState,
        //     };
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

        // case CLEAR_CART:
        //     console.log(action.type);
        //     return {
        //         ...state,
        //         cartOpen: false,
        //             cart: [],
        //     };

        case TOGGLE_CART:
            console.log(action.type);
            return {
                ...state,
                //cartOpen: !state.cartOpen,
            };

        default:
            return state;
    }
};

export default reducer;