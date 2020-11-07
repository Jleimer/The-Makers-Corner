import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import {idbPromise } from "../../utils/helpers";
import { Feed } from 'semantic-ui-react';

function SinglePost(post) {
    const state = useSelector(state => state);
    console.log(post);

    const {
        _id,
        title,
        username,
        createdAt,
        postText
    } = post

    return (
        <Feed.Event>
            <Feed.Label icon='user circle'/>
            <Feed.Content>
                <Feed.Summary href={`/posts/${_id}`}>{title} posted by {username}</Feed.Summary>
                <Feed.Extra>{postText}</Feed.Extra>
                <Feed.Meta>Created on {createdAt}</Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    );
};

export default SinglePost;
