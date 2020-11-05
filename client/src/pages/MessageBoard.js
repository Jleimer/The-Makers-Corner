import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { UPDATE_POSTS } from "../utils/actions";
import PostList from "../components/PostList";
import { idbPromise } from "../utils/helpers";
import Auth from "../utils/auth";
import { QUERY_ALL_POSTS, QUERY_SINGLE_USER } from "../utils/queries";
// QUERY_ME }

// comments CHANGED TO POSTS!!!!!

const MessageBoard = () => {
  const loggedIn = Auth.loggedIn();
  useSelector((state) => state);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_SINGLE_USER);
  let user;

  if (data) {
    user = data.user;
  }

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

  return (
    <div>
      <h2>Message Board</h2>
      {loggedIn ? (
        <div>
          <PostList />
        </div>
      ) : (
        <h2>You need to be logged into to see the message board!</h2>
      )}
    </div>
  );
};