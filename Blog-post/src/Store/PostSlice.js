import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
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
            state.posts = action.payload
            state.loading = false;
        },
        addPost: (state , action) => {
            const post = action.payload
            state.posts.push(post)
        },
        updatePost: (state , action) => {
            const updatedPost = action.payload
            state.posts = state.posts.map(post => post.slug === updatedPost.slug ? updatedPost : post)
        },
        deletePost: (state , action) => {
            const postslug = action.payload
            state.posts = state.posts.filter(post => post.slug !== postslug)
        },
        clearPosts: (state , action) => {
            state.posts = []
        },
        errorHandling: (state , action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {fetchStart , setPosts , addPost , updatePost , deletePost , clearPosts, errorHandling} = PostSlice.actions

export default PostSlice.reducer