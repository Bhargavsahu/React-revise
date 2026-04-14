import { useSelector } from 'react-redux'
import { PostCard , Container } from '../Components/Index'


function Allpost() {
  
  const posts = useSelector(state => state.post.posts)
  const loading = useSelector(state => state.post.loading)

  if(loading) {
    return <h1>Loading posts...</h1>
  }
  
  return (
    <div className="w-full">
      <Container>
        <div className="flex flex-wrap gap-4">
          {
            posts?.length > 0 ? (
              posts.map(post => (
                <div key={post.$id} className="w-1/4 p-2">
                  <PostCard {...post} />
                </div>
              ))
            ) : <h1>No posts available...</h1>
          }
        </div>
      </Container>
    </div>
  )
}

export default Allpost