import React , { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Protected({children}) {
    const [Loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state=> state.auth.status)

    useEffect(() => {
        if(!authStatus) {
            navigate('/login')
        }
        setLoader(false)
    } , [authStatus , navigate])

  return Loader ? <h1>Loading...</h1> : <>{children}</>;
}
