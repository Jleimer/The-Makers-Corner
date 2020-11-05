import React, { useState } from 'react';

// import { useMutation } from '@apollo/react-hooks';
// import { ADD_COMMENT } from '../../utils/mutations';
// import { QUERY_COMMENTS, QUERY_ME } from '../../utils/queries';


const Posts = ({ value = [], ...props }) => {
    const [state, dispatch] = useCommentReducer({
        posts: [],
    });
    return <Posts value={[state, dispatch]} {...props} />


// const Posts = () => {
//     const [postText] = useState('');
    
//     const [addPost] = useMutation(ADD_POST, {
//         update(cache, { data: { addPost } }) {
//             try {
//                 const { posts } = cache.readQuery({ query: QUERY_POSTS });
//                 cache.writeQuery({
//                     query: QUERY_POSTS,
//                     data: { posts: [addPost, ...posts] },
//                 });
//             } catch (e) {
//                 console.error(e);
//             }

//             const { me } = cache.readQuery({ query: QUERY_ME });
//             cache.writeQuery({
//                 query: QUERY_ME,
//                 data: { me: { ...me, posts: [...me.posts, addPost] } },
//             });
//         },
//     });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { PostText },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Post comments here..."
                    value={PostText}
                    className="form-input col-12 col-md-9"
                    // onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Posts;