import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import {idbPromise } from "../../utils/helpers";
import { Card, Button } from 'semantic-ui-react';
import Cart from "../Cart";

function BlueprintsItem(item) {
    const dispatch = useDispatch();
    const state = useSelector(state => state);


    const {
        name,
        _id,
        price,
        description,
        username,
        difficulty
    } = item;

    const { cart } = state

    const addToCart = () => {
        console.log(state)
        const itemInCart = cart.blueprints.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                blueprints: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    return ( 
        <div>
            {/* <Link to = {`/blueprints/${_id}`} >
                <p>{name}</p>
            </Link> 
            <div>
                <p>{description}</p>
                <p>{difficulty}</p>
                <p>{username}</p>
                <div>{quantity} {pluralize("item", quantity)} in stock </div>
                <span>${price}</span> 
            </div>
            <button onClick={addToCart}> Add to cart </button>  */}
            <Card>
                <Card.Content>
                    <Card.Header href={`/blueprints/{_id}`}>{name}</Card.Header>
                    <Card.Meta>Posted by {username}</Card.Meta>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Meta>{difficulty}</Card.Meta>
                    <Card.Meta>Price: ${price}</Card.Meta>
                    <br></br>
                    <Button basic color='black' className="cartBtn" onClick={addToCart}>
                        Add to Cart
                    </Button>
                </Card.Content>
            </Card>
        </div>
    );
}

export default BlueprintsItem;