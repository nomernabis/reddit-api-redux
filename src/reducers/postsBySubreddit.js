import { REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_POSTS} from "../actions"


export default function postsBySubreddit(state={}, action){
    switch(action.type){
        case REQUEST_POSTS:
        case INVALIDATE_POSTS:
        case RECEIVE_POSTS:
            return {...state, [action.subreddit]: posts(state[action.subreddit], action)}
        default:
            return state
    }
}

function posts(state={items: [], isFetching: false, didInvalidated: false}, action){
    switch(action.type){
        case REQUEST_POSTS:
            return {...state, isFetching: true, didInvalidated: false}
        case INVALIDATE_POSTS:
            return {...state, didInvalidated: true}
        case RECEIVE_POSTS:
            return {...state, isFetching: false, didInvalidated: false, items: action.posts}
        default:
            return state
    }
}