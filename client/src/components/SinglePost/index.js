import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import {idbPromise } from "../../utils/helpers";

function SinglePost(post) {
    const state = useSelector(state => state);

    const {
        _id,
        title,
        username,
        createdAt,
        postText
    } = post

    return (
        <div>
            <Link to={`/posts/${_id}`}>
                <p>{title}</p>
                <p>{postText}</p>
                <p>{username}</p>
                <p>Created at: {createdAt}</p>
            </Link>
        </div>
    );
};

export default SinglePost;
