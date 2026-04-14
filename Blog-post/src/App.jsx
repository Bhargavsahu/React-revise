import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import authservice from './Appwrite/auth'
import {login , logout} from './Store/AuthSlice'
import storeService from './Appwrite/Config'
import { errorHandling, fetchStart , setPosts } from './Store/PostSlice'
import {Header , Footer} from './Components/Index'
import { Outlet } from 'react-router-dom'

function App() {

  const user = useSelector(state => state.auth.userData)
  const loading = useSelector(state => state.post.loading) 
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.GetCurrentUser()
      .then((userData) => {
        if (userData) {
          const cleanData = {
            $id: userData.$id,
            email: userData.email,
            password: userData.password
          }
          dispatch(login(cleanData))
        } else {
          dispatch(logout())
        }
      })
  }, [])
  useEffect(() => {
    if (!user) return
    dispatch(fetchStart())
    storeService.GetPosts()
      .then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.rows))
        }
      })
      .catch((err) => {
        dispatch(errorHandling(err.message))
      })
  }, [user , dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
