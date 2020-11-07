import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COURSE, ADD_BLUEPRINT } from '../utils/mutations';
import Auth from "../utils/auth";
import { QUERY_SINGLE_COURSE, QUERY_SINGLE_BLUEPRINT, QUERY_ME, QUERY_CATEGORIES } from '../utils/queries';
import { Redirect } from 'react-router-dom';
import { Button, Form, Item } from 'semantic-ui-react';

import store from '../utils/store';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
  } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const Dashboard = () => {
    const state = store.getState();
    useSelector((state) => state);
    const dispatch = useDispatch();
    const { categories } = state;
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        // if categoryData exists or has changed from the response of useQuery, then run dispatch()
        if (categoryData) {
          // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categoryData.categories,
          });
    
          //puts the data into indexedDB
          categoryData.categories.forEach((category) => {
            idbPromise("categories", "put", category);
          });
        } else if (!loading) {
          // pulls from indexedDB storage
          idbPromise("categories", "get").then((categories) => {
            dispatch({
              type: UPDATE_CATEGORIES,
              categories: categories,
            });
          });
        }
      }, [categoryData, loading, dispatch]);
    
      const handleClick = (id) => {
        dispatch({
          type: UPDATE_CURRENT_CATEGORY,
          currentCategory: id,
        });
      };


    const [formInfo, setInfo] = useState('');
    
    const [addBlueprint, {error}] = useMutation(ADD_BLUEPRINT, {
        update(cache, { data: { addBlueprint } }) {
            try {
                const { blueprints } = cache.readQuery({ query: QUERY_SINGLE_BLUEPRINT});
                cache.writeQuery({
                    query: QUERY_SINGLE_BLUEPRINT,
                    data: { blueprints: [addBlueprint, ...blueprints] }
                });
            } catch (e) {
                console.error(e);
            }
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: {...me, blueprints: [...me.blueprints, addBlueprint] } }
            });
        }
    });

    const [addCourse] = useMutation(ADD_COURSE, {
        update(cache, { data: { addCourse } }) {
            try {
                const { courses } = cache.readQuery({ query: QUERY_SINGLE_COURSE});
                cache.writeQuery({
                    query: QUERY_SINGLE_COURSE,
                    data: { courses: [addCourse, ...courses] }
                });
            } catch (e) {
                console.error(e);
            }
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: {...me, courses: [...me.courses, addCourse] } }
            });
        }
    });

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addBlueprint({
                variables: { formInfo }
            });
            await addCourse({
                variables: { formInfo }
            });
            
            setInfo('');
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
            <div className="form-div">
                <h3>Add a Course</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Field>
                        <label htmlFor="name">Course Name: </label>
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
                        <label htmlFor="description">Course Description: </label>
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
                        {categories.map((item) => (
                            
                                item.name
                            
                        ))}
                        </select>
                    </Form.Field>
                    <Button type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
            <div className="form-div">
                <h3>Add a Blueprint</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Field>
                        <label htmlFor="name">Blueprint Title: </label>
                        <input
                            className="input"
                            placeholder="Mountain Landscape Painting"
                            name="name"
                            type="text"
                            id="name"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="description">Description: </label>
                        <textarea
                            className="text-area"
                            placeholder="A step by step guide on how to paint a beautiful mountain landscape."
                            name="description"
                            type="text"
                            id="description"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="file">File Type: </label>
                        <input
                            className="input"
                            placeholder="PDF"
                            name="file"
                            type="text"
                            id="file"
                            required
                            // onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="price">Price: </label>
                        <input
                            className="input"
                            placeholder="5.00"
                            name="price"
                            type="number"
                            id="price"
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
                        <label htmlFor="category">Category: </label>
                        <select
                            className="select"
                        >
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