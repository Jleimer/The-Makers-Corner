import React, { useEffect } from "react";
import CoursesItem from "../CoursesItem";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_COURSES } from "../../utils/actions";
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
               type: UPDATE_COURSES,
                courses: data.courses
            });
            data.courses.forEach((course) => {
              idbPromise('courses', 'put', course);
            });
        } else if (!loading) {
          idbPromise('courses', 'get').then((courses) => {
            dispatch({
              type: UPDATE_COURSES,
              courses: courses
            });
          });
        }
    }, [data, loading, dispatch]);
    
    function filterCourses() {
        if (!currentCategory) {
            return state.courses;
        }

        return state.courses.filter(course => course.category._id === currentCategory);
    }

  return (
    <div>
      {state.courses.length ? (
        <Grid columns={2} textAlign='center'>
            {filterCourses().map(course => (
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
