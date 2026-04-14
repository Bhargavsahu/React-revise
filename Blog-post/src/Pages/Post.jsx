import React from 'react'
import { Btn, Container } from '../Components/Index'
import { useSelector , useDispatch } from 'react-redux'
import { Link, useNavigate , useParams } from 'react-router-dom'
import { deletePost as storeDeletePost } from '../Store/PostSlice'
import storeService from '../Appwrite/Config'
import parse from 'html-react-parser'

function PostPage() {
    const posts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData) 
    const {slug} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Post = posts.find(post => post.slug === slug)

    const isAuthor = Post && userData ? Post.userId === userData.$id : false;

    const deletePost =  async () => {
        try {
            const status = await storeService.DeletePost({$id: Post.$id})
            if(status) {
                await storeService.DeleteFile({fileId: Post.featuredImage})
                dispatch(storeDeletePost(Post.$id))
                navigate('/')
            }
        } catch (error) {
            console.error('delete failed' ,error)
        }
    }

    if (Post) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div>
                        <img 
                            src={Post.featuredImage ? storeService.GetFilePreview(Post.featuredImage) : ''} 
                            alt={Post.Title}
                            className='rounded-xl' 
                        />
                    </div>
                    {
                        isAuthor && (
                            <div className='flex flex-wrap gap-x-2 py-3'>
                                <Link to={`/editpost/${Post.slug}`}>
                                    <Btn>
                                        Edit
                                    </Btn>
                                </Link>
                                <Btn onClick = {() => {deletePost()}}>
                                    Delete 
                                </Btn>
                            </div>
                        )
                    }
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{Post.Title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(Post.content)}
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return <div>Post not found...</div>
    }
}

export default PostPage