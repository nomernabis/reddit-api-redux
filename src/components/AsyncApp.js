import React, { Component } from "react"
import { selectSubreddit } from "../actions"
import { connect } from "react-redux"
import { fetchPostsIfNeeded, invalidateSubreddit } from "../actions"
import Picker from "./Picker"
import Posts from "./Posts"

import "../styles/App.css"

class AsyncApp extends Component{
    componentDidMount(){
        this.props.loadPosts()
    }

    componentDidUpdate(prevProps){
        this.props.loadPosts()
    }

    render() {
        const {selectedSubreddit, posts, onChange, isFetching, invalidateSubreddit, lastUpdated} = this.props
        return (
            <div>
                <h1>Reddit Headlines</h1>
                <Picker options={['elderscrollsonline', 'cpp', 'reactjs']} value={selectedSubreddit} onChange={onChange} />
                <button disabled={isFetching} onClick={() => invalidateSubreddit(selectedSubreddit)}>Invalidate</button>
                {lastUpdated && <p>Last updated at {new Date(lastUpdated).toLocaleTimeString()}</p>}
                {!isFetching && posts.length == 0 && (<p>Empty list</p>)}
                {isFetching && posts.length == 0 && (<p>Loading...</p>)}
                {posts.length > 0 && (
                    <div style={{opacity: isFetching ? 0.5 : 1}}>
                        <Posts posts={posts} />
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let selectedSubreddit = state.selectedSubreddit
    if(state.postsBySubreddit[selectedSubreddit]){
        const {items, isFetching, didInvalidated, lastUpdated} = state.postsBySubreddit[selectedSubreddit]
        return {posts: items, isFetching, didInvalidated, selectedSubreddit, lastUpdated}
    } else {
        return {posts: [], isFetching: false, didInvalidated: false, selectedSubreddit}
    }
}

const mapDispatchToProps = (dispatch) => ({
    onChange: subreddit => dispatch(selectSubreddit(subreddit)),
    loadPosts: () => dispatch(fetchPostsIfNeeded()),
    invalidateSubreddit: subreddit => dispatch(invalidateSubreddit(subreddit))
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)
