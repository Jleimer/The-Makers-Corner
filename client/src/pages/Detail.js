import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';


import {
    REMOVE_FROM_CART,
    ADD_TO_CART,
    UPDATE_PRODUCTS
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';


const Detail = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { id } = useParams();

    const [currentProduct, setCurrentProduct ] = useState({});
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const { products, cart } = state;

    useEffect(() => {
        if (products.length) {
            setCurrentProduct(products.find(product => product._id === id));
        }
        else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
              });
            
            data.products.forEach((product) => {
            idbPromise('products', 'put', product);
            });
        }
        else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
              dispatch({
                type: UPDATE_PRODUCTS,
                products: indexedProducts
              });
            });
        }
    }, [products, data, loading, dispatch, id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id)
        if (!itemInCart) {
            dispatch({
                type: ADD_TO_CART,
                product: {...currentProduct, purchaseQuantity: 1}
            });
            idbPromise('cart', 'put', {...currentProduct, purchaseQuantity: 1});
        }
    }

    const removeFromCart = () => {
        dispatch({
          type: REMOVE_FROM_CART,
          _id: currentProduct._id
        });
    
        idbPromise('cart', 'delete', { ...currentProduct });
      };

    return (
        <>
        {currentProduct && cart ? (
          <div>
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
  
            <img
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
            />
          </div>
        ) : null}
      </>
    );
};

export default Detail;