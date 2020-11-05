import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_POSTS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ALL_POSTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import SinglePost from "../SinglePost";

function PostList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_ALL_POSTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_POSTS,
        posts: data.posts,
      });
      data.posts.forEach((post) => {
        idbPromise("posts", "put", post);
      });
    } else if (!loading) {
      idbPromise("posts", "get").then((posts) => {
        dispatch({
          type: UPDATE_POSTS,
          posts: posts,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterPosts() {
      if (!currentCategory) {
          return state.posts;
      }
      return state.posts.filter(post => post.category._id === currentCategory);
  }

  return (
    <div className="my-2">
            <h2>Our Posts:</h2>
            {state.posts.length ? (
                <div className="flex-row">
                    {filterPosts().map(post => (
                        <SinglePost
                            key={post._id}
                            _id={post._id}
                            title={post.title}
                            username={post.username}
                            createdAt={post.createdAt}
                            />
                    ))}
                </div>
            ) : (
                <h3>No posts yet!</h3>
            )}
            {/* { loading ? 
            <img src={spinner} alt="loading" />: null} */}
        </div>
  );
        };

export default PostList;
