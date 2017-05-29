/* Posts */

const initPostState = {
    listingPosts: false,
    listingMorePosts: undefined, // id of post from which to start
    posts: [],
    hasMore: true,
    creatingPost: false,
    creatingVote: false
};
export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LIST_POSTS':
            return {
                ...state,
                listingPosts: true,
                listingMorePosts: undefined
            };
        case '@POST/END_LIST_POSTS':
            if (!action.posts)
                return {
                    ...state,
                    listingPosts: false
                };
            return {
                ...state,
                listingPosts: false,
                posts: action.posts,
                hasMore: action.posts.length > 0
            };
        case '@POST/START_LIST_MORE_POSTS':
            return {
                ...state,
                listingMorePosts: action.start
            };
        case '@POST/END_LIST_MORE_POSTS':
            if (!action.posts)
                return state;
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                hasMore: action.posts.length > 0
            };
        case '@POST/START_CREATE_POST':
            return {
                ...state,
                creatingPost: true
            };
        case '@POST/END_CREATE_POST':
            if (!action.post)
                return {
                    ...state,
                    creatingPost: false
                };
            var newPosts = state.posts.slice();
            newPosts.unshift(action.post);
            return {
                ...state,
                creatingPost: false,
                posts: newPosts
            };
        case '@POST/START_CREATE_VOTE':
            return {
                ...state,
                creatingVote: true
            };
        case '@POST/END_CREATE_VOTE':
            if (!action.post)
                return {
                    ...state,
                    creatingVote: false
                };
            var newPosts = state.posts.map(p => {
                if (p.id === action.post.id)
                    return action.post;
                return p;
            });
            return {
                ...state,
                creatingVote: false,
                posts: newPosts
            };
        default:
            return state;
    }
}

/* Post Form */

const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    mood: 'na'
};

export function postForm(state = initPostFormState, action) {
    switch (action.type) {
        case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POST_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };
        default:
            return state;
    }
}

/* Post item */

const initPostItemState = {
    tooltipOpen: {}
};

export function postItem(state = initPostItemState, action) {
    switch (action.type) {
        case '@POST_ITEM/TOGGLE_TOOLTIP':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: state.tooltipOpen[action.id] ? false : true
                }
            };
        case '@POST_ITEM/SET_TOOLTIP_TOGGLE':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: action.toggle
                }
            };
        default:
            return state;
    }
}
