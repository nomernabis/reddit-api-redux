import fetch from 'cross-fetch'


export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const selectSubreddit = (subreddit) => ({
    type: SELECT_SUBREDDIT,
    subreddit
})

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const requestPosts = (subreddit) => ({
    type: REQUEST_POSTS,
    subreddit
})

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const receivePosts = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data)
})

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'
export const invalidateSubreddit = (subreddit) => ({
    type: INVALIDATE_POSTS,
    subreddit
})

export const fetchPosts = (subreddit) => {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(
                response => response.json(),
                error => console.log('error', error)
            )
            .then(json =>
                dispatch(receivePosts(subreddit, json))
            )
    }
}

const shouldFetchPosts = (state) => {
    const posts = state.postsBySubreddit[state.selectedSubreddit]
    if(!posts){
        return true
    } else if(posts.isFetching){
        return false
    } else {
        return posts.didInvalidated
    }
}

export const fetchPostsIfNeeded = () => {
    return (dispatch, getState) => {
        if(shouldFetchPosts(getState())){
            return dispatch(fetchPosts(getState().selectedSubreddit))
        }
    }
}