import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi
} from '../api/posts.js';

/*  Posts */

function startListPosts() {
    return {
        type: '@POST/START_LIST_POSTS'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

function startListMorePosts(start) {
    return {
        type: '@POST/START_LIST_MORE_POSTS',
        start
    };
}

function endListMorePosts(posts) {
    return {
        type: '@POST/END_LIST_MORE_POSTS',
        posts
    };
}

function startCreatePost() {
    return {
        type: '@POST/START_CREATE_POST'
    };
}

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    };
}

function startCreateVote() {
    return {
        type: '@POST/START_CREATE_VOTE'
    };
}

function endCreateVote(post) {
    return {
        type: '@POST/END_CREATE_VOTE',
        post
    };
}

export function listPosts(searchText) {
    return (dispatch, getState) => {
        dispatch(startListPosts());
        return listPostsFromApi(searchText).then(posts => {
            dispatch(endListPosts(posts));
        }).catch(err => {
            dispatch(endListPosts());
            console.error('Error listing posts', err);
        });
    };
};

export function listMorePosts(searchText, start) {
    return (dispatch, getState) => {
        dispatch(startListMorePosts(start));
        return listPostsFromApi(searchText, start).then(posts => {
            dispatch(endListMorePosts(posts));
        }).catch(err => {
            dispatch(endListMorePosts());
            console.error('Error listing more posts', err);
        });
    };
};

export function createPost(mood, text) {
    return (dispatch, getState) => {
        dispatch(startCreatePost());

        return createPostFromApi(mood, text).then(post => {
            dispatch(endCreatePost(post));
        }).catch(err => {
            dispatch(endCreatePost())
            console.error('Error creating post', err);
        });
    };
};

export function createVote(id, mood) {
    return (dispatch, getState) => {
        dispatch(startCreateVote());

        return createVoteFromApi(id, mood).then(post => {
            dispatch(endCreateVote(post));
        }).catch(err => {
            dispatch(endCreateVote())
            console.error('Error creating vote', err);
        });
    };
};

/*  Post Form */

export function input(value) {
    return {
        type: '@POST_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@POST_FORM/INPUT_DANGER',
        danger
    };
};

export function selectMood(mood) {
    return {
        type: '@POST_FORM/SELECT_MOOD',
        mood
    };
};

/*  Post item */

export function toggleTooltip(id) {
    return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id
    };
};

export function setTooltipToggle(id, toggle) {
    return {
        type: '@POST_ITEM/SET_TOOLTIP_TOGGLE',
        id,
        toggle
    };
};
