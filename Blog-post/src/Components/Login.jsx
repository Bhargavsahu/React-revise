import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link , useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../Store/AuthSlice'
import { Btn , Input , Container , Logo } from './Index'
import { useDispatch } from 'react-redux'
import authservice from '../Appwrite/auth'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register , handleSubmit } = useForm()
    const [Error, setError] = useState('')

    const loginHandler = async (data) => {
        setError("")
        try {
            const session = await authservice.Login(data)
            if(session){
                const userData = await authservice.GetCurrentUser()
                if(userData) {
                    dispatch(storeLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                don&apos;t have an account &nbsp;
                <Link 
                className='font-medium text-primary transition-all duration-200 hover:underline'
                to={'/signup'}
                >
                    Sign up
                </Link>
            </p>
            {Error && <p className='text-red-600 mt-8 text-center'>{Error}</p>}
            <form onSubmit={handleSubmit(loginHandler)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label = 'Email:'
                    placeholder = 'Enter your email'
                    type = 'email'
                    {...register("email" , {
                        required:true,
                        validate:{
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label= 'Password:'
                    type='password'
                    placeholder='enter your password'
                    {...register('password' , {
                        required:true
                    })}
                    />
                    <Btn className='w-full' type='submit'>Sign in</Btn>

                </div>
            </form>
        </div>
    </div>
  )
}

export default Login