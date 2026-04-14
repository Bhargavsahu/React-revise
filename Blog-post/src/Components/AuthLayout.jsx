import React , { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Protected({ authentication , children}) {
    const [Loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state=> state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    } , [authStatus , navigate])

  return Loader ? <h1>Loading...</h1> : <>{children}</>;
}
