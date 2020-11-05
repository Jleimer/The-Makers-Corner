import { useQuery } from "@apollo/react-hooks";
import React from "react";
import PostList from "../components/PostList";
import Auth from "../utils/auth";
import { QUERY_ALL_POSTS, QUERY_SINGLE_USER } from "../utils/queries";
// QUERY_ME }

// comments CHANGED TO POSTS!!!!!

const MessageBoard = () => {
  // const { data } = useQuery(QUERY_COMMENTS);
  // const { data: userData } = useQuery(QUERY_ME);
  // const comments = data?.comments || [];

     const { loading, data } = useQuery(QUERY_ALL_POSTS);
     const { data: userData } = useQuery(QUERY_SINGLE_USER);
     const posts = data?.posts || [];

     const loggedIn = Auth.loggedIn();
//   const { data } = useQuery(QUERY_SINGLE_USER);
//   let user;

//   if (data) {
//     user = data.user;
//   }
  return (
    <div>
      <h2>Message Board</h2>
        {loggedIn && (
            <div>
                <PostList />
            </div>
        )}
        <div className={`${loggedIn}`}>
            {loading ? (
                <div>Loading...</div>
            ):(
                <PostList posts={posts} title="Join the discussion -"/>
            )}
        </div>
    </div>
  );
};

export default MessageBoard;
