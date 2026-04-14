import React , {useState} from 'react'
import authservice from '../../Appwrite/auth'
import { logout } from '../../Store/AuthSlice'
import { useDispatch , useSelector } from 'react-redux'
import { fetchStart , clearPosts } from '../../Store/PostSlice'

function Logoutbtn() {
    const [Loggingout, setLoggingout] = useState(false)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        setLoggingout(true)
        authservice.Logout()
            .then(() => {
                dispatch(logout())
                dispatch(clearPosts())
            })
            .catch((error) => {
                console.error("Logout failed:", error)
            })
            .finally(() => {setLoggingout(false)})
    }
  return ( 
    <button onClick={logoutHandler} disabled={Loggingout}>
        {Loggingout ? 'Logging out...' : 'Logout'}
    </button>
  )
}

export default Logoutbtn