import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';

import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
import store from '../../utils/store';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_CART } from '../../utils/actions';
import './style.css'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const dispatch = useDispatch();
    
    const state = store.getState();
    useSelector(state => state);

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // useEffect(() => {
    //     async function getCart() {
    //         const cart = await idbPromise('cart', 'get');
    //         dispatch({ type: ADD_MULTIPLE_TO_CART, courses: [...cart] });
    //     };

    //     if (!state.cart.length) {
    //         getCart();
    //     }
    // }, [state.cart.length, dispatch]);

    // useEffect(() => {
    //     async function getCart() {
    //         const cart = await idbPromise('cart', 'get');
    //         dispatch({ type: ADD_MULTIPLE_TO_CART, blueprints: [...cart] });
    //     };

    //     if (!state.cart.length) {
    //         getCart();
    //     }
    // }, [state.cart.length, dispatch]);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span role="img" aria-label="trash">
                    🛒
                </span>
            </div>
        );
    }

    function submitCheckout() {
        const course = [];
        const blueprint = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                course.push(item._id);
                blueprint.push(item._id);
            }
        });

        getCheckout({
            variables: { course: course, blueprint: blueprint }
        });
    }

    

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>
                [close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>

                        {
                            Auth.loggedIn() ? (
                                <button onClick={submitCheckout}>
                                    Checkout
                                </button>
                            ) : (
                                    <span>(log in to check out)</span>
                            )}
                    </div>
                </div>
            ) : (
                <h3>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;
