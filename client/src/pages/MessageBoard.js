import React from 'react';
import Comments from '../components/Posts';
import Auth from '../utils/auth';
// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_COMMENTS } from '../utils/queries';
    // QUERY_ME } 


    // comments CHANGED TO POSTS!!!!!
    
const MessageBoard = () => {
   // const { data } = useQuery(QUERY_COMMENTS);
   // const { data: userData } = useQuery(QUERY_ME);
   // const comments = data?.comments || [];

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