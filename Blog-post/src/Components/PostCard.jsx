import React from 'react'
import storeService from '../Appwrite/Config'
import { Link } from 'react-router-dom'

function PostCard({slug , Title , featuredImage}) {
  return (
     <Link to={`/post/${slug}`}>
        <div className='w-full rounded-xl p-4 bg-gray-100' >
            <div className='justify-center mb-4 w-full'>
                <img src={storeService.GetFilePreview(featuredImage)} alt={Title} className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>{Title}</h2>
        </div>
     </Link>
  )
}

export default PostCard