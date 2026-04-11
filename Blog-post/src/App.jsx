import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import authservice from './Appwrite/auth'
import {login , logout} from './Store/AuthSlice'
import storeService from './Appwrite/Config'
import { errorHandling, fetchStart , setPosts } from './Store/PostSlice'

function App() {

  const user = useSelector(state => state.auth.userdata)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.GetCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata))
        } else {
          dispatch(logout())
        }
      })
  }, [user])
  useEffect(() => {
    if (!user) return
    dispatch(fetchStart())
    storeService.GetPosts()
      .then((posts) => {
        if (posts) {
          dispatch(setPosts(posts))
        }
      })
      .catch((err) => {
        dispatch(errorHandling(err.message))
      })
  }, [])

  return (
    <div>
      {user ? <p>Logged in</p> : <p>Logged out</p>}
    </div>
  )
}

export default App
