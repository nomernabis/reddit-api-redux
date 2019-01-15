import React from "react"

const Posts = ({ posts }) => (
    <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
)

export default Posts