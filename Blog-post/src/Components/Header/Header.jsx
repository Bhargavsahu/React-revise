import React from 'react'
import {Container , Logo , Logoutbtn} from '../Index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authstatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'home',
      slug: '/',
      active: true
    },
    {
      name: 'login',
      slug: '/login',
      active: !authstatus
    },
    {
      name: 'sign-up',
      slug: '/signup',
      active: !authstatus
    },
    {
      name: 'All posts',
      slug: '/allPosts',
      active: authstatus
    },
    {
      name: "Add post",
      slug: '/addPost',
      active: authstatus
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100 px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                      >{item.name}</button>
                  </li>
                ) : null
              )
            }
            {authstatus && (
              <li>
                <Logoutbtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header