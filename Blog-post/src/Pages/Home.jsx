import React , { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container , Btn, Postform, PostCard } from '../Components/Index'

function Home() {
    const posts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    // const [myPosts, setMyPosts] = useState([])


    // useEffect(() => {
    //     if(!userData) return;

    //     const filteredPosts = posts.filter((post) => (post.userId === userData.$id))
    //     setMyPosts(filteredPosts)
        
    // } , [userData , posts])

    const myPosts = userData ? posts.filter(post => post.userId === userData.$id) : []

    if(!userData) {  //user not logged in
        return (
            <Container>
                <p>Log in to see your posts</p>
                <button onClick={() => {navigate('/login')}}>Log in</button>
            </Container>
        )
    }
    if(myPosts.length === 0) { //user has no posts
        return (
            <div className='w-full py-8'>
                <Container>
                    <p>You haven't created any post</p>
                    <div className='flex flex-wrap'>
                        <Btn onClick={() => {navigate('/addpost')}}>
                            Create one!
                        </Btn>
                        <Btn onClick={() => {navigate('/allposts')}}>
                            All posts
                        </Btn>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='py-8 w-full'>
            <Container>
                <h1>Your posts...</h1>
                <div className='flex flex-wrap gap-x-3'>
                    {
                        myPosts.map(post => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post}/>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )

}

export default Home