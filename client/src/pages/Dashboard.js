import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_PRODUCT } from '../utils/mutations';
import Auth from "../utils/auth";
import {
    QUERY_SINGLE_PRODUCT,
    QUERY_ME,
    QUERY_CATEGORIES,
  } from "../utils/queries";
import { Redirect } from 'react-router-dom';
import SinglePost from '../components/SinglePost';

import { Button, Form } from 'semantic-ui-react';

import store from '../utils/store';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
  } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const Dashboard = () => {
    
    const state = useSelector((state) => state);

    const { loading, data } = useQuery(QUERY_ME);
    const posts = data?.me.posts || [];
    const { categories } = useQuery(QUERY_CATEGORIES);
    console.log(categories, "this is categories");
    console.log(data, "this is query_me")

    const [formInfo, setInfo] = useState("");

    const [addProduct, { error }] = useMutation(ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
        try {
            const { products } = cache.readQuery({
                query: QUERY_SINGLE_PRODUCT,
            });
            cache.writeQuery({
                query: QUERY_SINGLE_PRODUCT,
                data: { blueprints: [addProduct, ...products] },
            });
        } catch (e) {
            console.error(e);
        }
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, products: [...me.products, addProduct] } },
        });
        },
    });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        await addProduct({
            variables: { formInfo },
        });
        setInfo("");
        } catch (e) {
        console.error(e);
        }
    };

    if (!Auth.loggedIn()) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>My Courses</h3>
            </div>
            <div>
                <h3>My Blueprints</h3>
            </div>
            <div>
                <h3>My Posts</h3>
                <div className="flex-row">
                {posts.map((post) => (
                    <SinglePost
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    username={post.username}
                    createdAt={post.createdAt}
                    />
                ))}
            </div>
        </div>
            <div className="form-div">
                <h3>Add a Product</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Field>
                        <label htmlFor="name">Product Name: </label>
                        <input
                            className="input"
                            placeholder="Painting 101"
                            name="name"
                            type="text"
                            id="name"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="category">Type: </label>
                        <select className="select">
                            {/* NEED TO MAP TYPE */}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="description">Product Description: </label>
                        <textarea
                            className="text-area"
                            placeholder="A course on the basics every painter needs to know."
                            name="description"
                            type="text"
                            id="description"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="price">Price: </label>
                        <input
                            className="input"
                            placeholder="12.00"
                            name="price"
                            type="number"
                            id="price"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="date">Date: </label>
                        <input
                            className="input"
                            placeholder="01/01/2021"
                            name="date"
                            type="date"
                            id="date"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="difficulty">Difficulty: </label>
                        <input
                            className="input"
                            placeholder="Beginner"
                            name="difficulty"
                            type="text"
                            id="difficulty"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="items">Items Included: </label>
                        <input
                            className="input"
                            placeholder="Canvas, paint brush, acrylic paint"
                            name="items"
                            type="text"
                            id="items"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="category">Category: </label>
                        <select className="select">
                            {/* NEED TO MAP CATEGORIES */}
                        </select>
                    </Form.Field>
                    <Button type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
      </div>
    );
};

export default Dashboard;