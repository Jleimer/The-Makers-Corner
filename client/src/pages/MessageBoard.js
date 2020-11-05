import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Comments from '../components/Comments';
import Auth from '../utils/auth';
import { QUERY_ALL_POSTS, QUERY_ME } from '../utils/queries';
    // QUERY_ME } 


    // comments CHANGED TO POSTS!!!!!
    
const MessageBoard = () => {
   // const { data } = useQuery(QUERY_COMMENTS);
   // const { data: userData } = useQuery(QUERY_ME);
   // const comments = data?.comments || [];

   const { loading, data } = useQuery(QUERY_ALL_POSTS);
   const { data: userData } = useQuery(QUERY_ME);
   const posts = data?.posts || [];

   const loggedIn = Auth.loggedIn();

    return (
        <div>
            <h2>Message Board</h2>
            {loggedIn && (
                <div>
                    <Comments/>
                </div>
            )}
        </div>
    );
};

export default MessageBoard;