import React from 'react';
import { useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_POSTS } from '../utils/queries';

const SinglePost = props => {
    const {id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_ALL_POSTS, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="card">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {post.username}
                    </span>{' '}
                    Posted on {post.createdAt}
                </p>
                <div className="card-body">
                    <p>{post.postText}</p>
                </div>
            </div>

            {post.commentCount > 0 && <PostList comments={post.comments} />}

            {Auth.loggedIn() && <PostForm postId={post._id} />}

        </div>
    )
}

export default SinglePost;