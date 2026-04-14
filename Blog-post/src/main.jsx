import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Home , Editpost , Addpost , Allpost , Login , Post , Signup} from './Pages/Index.js'
import { Protected } from './Components/Index.js'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:'/signup',
        element: (
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        )
      },
      {
        path: '/editpost/:slug',
        element: (
          <Protected authentication={true}>
            <Editpost/>
          </Protected>
        )
      },
      {
        path: '/allposts',
        element: (
          <Protected authentication={true}>
            <Allpost/>
          </Protected>
        )
      },
      {
        path: '/addpost',
        element: (
          <Protected authentication={true}>
            <Addpost/>
          </Protected>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <Protected authentication={true}>
            <Post/>
          </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
