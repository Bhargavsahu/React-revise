import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Postform } from '../Components/Index'

function Editpost() {
    const allPosts = useSelector(state => state.post.posts)
    const {slug} = useParams()
    const navigate = useNavigate()
    
    const post = allPosts.find((p)=> (p.slug === slug))

    if(!post) {
        return (
            <div>
                <p>Post not found...</p>
                <button onClick={() => {navigate('/')}}>Go back</button>
            </div>
        )
    }

  return (
    <div className='w-full py-8'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  )
}

export default Editpost