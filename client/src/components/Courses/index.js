import React, { useEffect } from "react";
import CoursesItem from "../CoursesItem";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORY_COURSES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Grid } from 'semantic-ui-react';

function Courses() {
  const dispatch = useDispatch();
    const state = useSelector(state => state);

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_CATEGORY_COURSES);
    console.log(data);

    useEffect(() => {
        if(data) {
          dispatch({
               type: UPDATE_PRODUCTS,
                products: data.courses
            });
            data.courses.forEach((product) => {
              idbPromise('products', 'put', product);
            });
        } else if (!loading) {
          idbPromise('products', 'get').then((products) => {
            dispatch({
              type: UPDATE_PRODUCTS,
                products: products
            });
          });
        }
    }, [data, loading, dispatch]);
    
    function filterProducts() {
        if (!currentCategory) {
            return state.products;
        }

        return state.products.filter(product => product.category._id === currentCategory);
    }

  return (
    <div>
      {state.products.length ? (
        <Grid columns={2} textAlign='center'>
            {filterProducts().map(course => (
                <CoursesItem
                  key={course._id}
                  _id={course._id}
                  name={course.name}
                  price={course.price}
                />
            ))}
        </Grid>
      ) : (
        <h3>You haven't added any courses yet!</h3>
      )}
      { loading ? 
      <div>Loading.....</div>: null}
    </div>
  );
}

export default Courses;
