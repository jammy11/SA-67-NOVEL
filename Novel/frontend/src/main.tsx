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
import L_Bookshelf from './page/Bookshelf/L_Bookshelf'
import Income from './page/writer/Income'
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
  },
  {
    path: "/bookself",
    element:<L_Bookshelf/>
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
  }
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
   
  </React.StrictMode>
)
