import { createSlice } from '@reduxjs/toolkit'

initialState = {
    Posts: [],
    loading: false,
    error:null
}

const PostSlice = createSlice({
    name: 'Post',
    initialState,
    reducers:{
        fetchStart: (state) => {
            state.loading = true;
            state.error = null
        },
        setPosts: (state , action) => {
            state.Posts(action.payload)
        },
        addPost: (state , action) => {
            const post = action.payload
            state.Posts.push(post)
        },
        updatePost: (state , action) => {
            const updatedPost = action.payload
            state.Posts = state.Posts.map(post => post.slug === updatedPost.slug ? updatedPost : post)
        },
        deletePost: (state , action) => {
            const postslug = action.payload
            state.Posts = state.Posts.filter(post => post.slug !== postslug)
        },
        errorHandling: (state , action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})


export default PostSlice.reducer