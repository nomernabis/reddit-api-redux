import React, { Component } from "react"
import { selectSubreddit } from "../actions"
import { connect } from "react-redux"
import { fetchPostsIfNeeded, invalidateSubreddit } from "../actions"
import Picker from "./Picker"
import Posts from "./Posts"

import "../styles/App.css"

class AsyncApp extends Component{
    componentDidMount(){
        console.log('dm')
        this.props.loadPosts()
    }

    componentDidUpdate(prevProps){
        this.props.loadPosts()
    }

    render() {
        const {selectedSubreddit, posts, onChange, isFetching, invalidateSubreddit} = this.props
        let postsOrLoading = posts.length == 0 ? <div>Loading</div> : <Posts posts={posts} />
        return (
            <div>
                <h1>Reddit Headlines</h1>
                <Picker options={['elderscrollsonline', 'cpp', 'reactjs']} value={selectedSubreddit} onChange={onChange} />
                <button disabled={isFetching} onClick={() => invalidateSubreddit(selectedSubreddit)}>Invalidate</button>
                {postsOrLoading}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let selectedSubreddit = state.selectedSubreddit
    if(state.postsBySubreddit[selectedSubreddit]){
        const {items, isFetching, didInvalidated} = state.postsBySubreddit[selectedSubreddit]
        return {posts: items, isFetching, didInvalidated, selectedSubreddit}
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
