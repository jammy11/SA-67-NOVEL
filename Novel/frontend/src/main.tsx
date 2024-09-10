import React from 'react'
import ReactDOM from 'react-dom/client'
import Payment from './page/CoinsAndTransaction/CoinsAndTransaction'
import './style.css'
import Home from './page/Home/Home'
import Writer from './page/writer/Writer'
import Withdraw from './page/writer/Withdraw'
import Writer_edit from './page/writer/Writer_edit'
import Profile from './page/Profile/profile'
import EditProfile from './page/Profile/editProfile'
import Login from './page/authentication/Login/Login'
import Register from './page/authentication/Register/register'
import L_Bookshelf from './page/Bookshelf/L_Bookshelf'
import Income from './page/writer/Income'
import SignInPages from './page/authentication/Logintest'
import Test from './page/test/tests'
import L_Content from './page/Bookshelf/L_Content'
import {createBrowserRouter,RouterProvider,Router,Link} from 'react-router-dom'

const router =createBrowserRouter([
  {
    path: "/Payment",
    element:<Payment/>
  },
  {
    path: "/",
    element:<Home/>
  }
  ,
  {
    path: "/profile",
    element:<Profile/>
  }
  ,  {
    path: "/Writer",
    element:<Writer/>
  },
  {
    path: "/Withdraw",
    element:<Withdraw/>
  }
  ,
  {
    path: "/Writer_edit",
    element:<Writer_edit/>
  }
  ,
  {
    path: "/editProfile",
    element:<EditProfile/>
  },
  {
    path: "/Income",
    element:<Income/>
  },
  {
    path: "/a",
    element:<SignInPages/>
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/register",
    element:<Register/>
  },
  {
    path: "/test",
    element:<Test/>
  },
  {
    path: "/L_Content",
    element:<L_Content/>
  }
    
    ,
    {
      path: "/bookself",
      element:<L_Bookshelf/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
   
  </React.StrictMode>
)
