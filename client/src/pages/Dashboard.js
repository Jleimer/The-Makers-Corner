import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_COURSE, ADD_BLUEPRINT } from "../utils/mutations";
import { useSelector } from "react-redux";
import Auth from "../utils/auth";
import {
  QUERY_SINGLE_COURSE,
  QUERY_SINGLE_BLUEPRINT,
  QUERY_ME,
  QUERY_CATEGORIES,
} from "../utils/queries";
import { Redirect } from "react-router-dom";
import SinglePost from "../components/SinglePost";

const Dashboard = () => {

  const state = useSelector((state) => state);

  const { loading, data } = useQuery(QUERY_ME);
  const posts = data?.me.posts || [];
  const blueprints = data?.me.blueprints || [];
  const courses = data?.me.courses || [];
  const { categories } = useQuery(QUERY_CATEGORIES);
  console.log(categories, "this is categories");
  console.log(data, "this is query_me")

  const [formInfo, setInfo] = useState("");

  const [addBlueprint, { error }] = useMutation(ADD_BLUEPRINT, {
    update(cache, { data: { addBlueprint } }) {
      try {
        const { blueprints } = cache.readQuery({
          query: QUERY_SINGLE_BLUEPRINT,
        });
        cache.writeQuery({
          query: QUERY_SINGLE_BLUEPRINT,
          data: { blueprints: [addBlueprint, ...blueprints] },
        });
      } catch (e) {
        console.error(e);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, blueprints: [...me.blueprints, addBlueprint] } },
      });
    },
  });

  const [addCourse] = useMutation(ADD_COURSE, {
    update(cache, { data: { addCourse } }) {
      try {
        const { courses } = cache.readQuery({ query: QUERY_SINGLE_COURSE });
        cache.writeQuery({
          query: QUERY_SINGLE_COURSE,
          data: { courses: [addCourse, ...courses] },
        });
      } catch (e) {
        console.error(e);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, courses: [...me.courses, addCourse] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBlueprint({
        variables: { formInfo },
      });
      await addCourse({
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
      <div>My Courses</div>
      <div>My Blueprints</div>
      <div>
        My Posts
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
      <div>
        <h3>Add a Course</h3>
        <div className="form-div">
          <form onSubmit={handleFormSubmit}>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <label htmlFor="price">Price: </label>
              <input
                className="input"
                placeholder="12.99"
                name="price"
                type="number"
                id="price"
                required
                // onChange={handleChange}
              />
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <label htmlFor="category">Category: </label>
              <select className="select">
                {/* {categories.map((category) => {
                                    return <option value={category._id}>{category.name}</option>
                                })} */}
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <h3>Add a Blueprint</h3>
        <div className="form-div">
          <form onSubmit={handleFormSubmit}>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <label htmlFor="price">Price: </label>
              <input
                className="input"
                placeholder="5.99"
                name="price"
                type="number"
                id="price"
                required
                // onChange={handleChange}
              />
            </div>
            <div>
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
            </div>
            <div>
              <label htmlFor="category">Category: </label>
              <select className="select"></select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
