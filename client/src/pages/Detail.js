import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';


import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_BLUEPRINTS,
    UPDATE_COURSES
} from '../utils/actions';
import { QUERY_ALL_BLUEPRINTS, QUERY_ALL_COURSES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';


const Detail = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { id } = useParams();

    // const [currentProduct, setCurrentProduct ] = useState({});
    const [currentBlueprint, setCurrentBlueprint, currentCourse, setCurrentCourse] = useState({});
    const { loading, data } = useQuery(QUERY_ALL_COURSES, QUERY_ALL_BLUEPRINTS);
    const { blueprints, courses, cart } = state;

    useEffect(() => {
        if (blueprints.length || courses.length) {
            setCurrentBlueprint(blueprints.find(blueprint => blueprint._id === id));
            setCurrentBlueprint(courses.find(course => course._id === id));
        }
        else if (data) {
            dispatch({
                type: UPDATE_BLUEPRINTS,
                products: data.blueprints
              });
            
            data.blueprints.forEach((blueprint) => {
                idbPromise('blueprints', 'put', blueprint);
            });
            dispatch({
                type: UPDATE_COURSES,
                products: data.courses
            });

            data.courses.forEach((course) => {
                idbPromise('courses', 'put', course);
            });
        }
        
        else if (!loading) {
            idbPromise('blueprints', 'get').then((indexedBlueprints) => {
              dispatch({
                type: UPDATE_BLUEPRINTS,
                blueprints: indexedBlueprints
              });
            });
            idbPromise('courses', 'get').then((indexedCourses) => {
                dispatch({
                  type: UPDATE_COURSES,
                  courses: indexedCourses
                });
              });
        }
    }, [blueprints, courses, data, loading, dispatch, id]);

    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === id)
    
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
        // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1 }
        });
        // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
        idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
      }
    }

    const removeFromCart = () => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: currentProduct._id
      });

    return (
        <>
        {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
              <strong>Price:</strong>
              ${currentProduct.price}
              {" "}
              <button onClick={addToCart}>
                Add to Cart
              </button>
              <button 
                disabled={!cart.find(p => p._id === currentProduct._id)} 
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
            </p>
          </div>
        ) : null}
      </>
    );
}};

export default Detail;