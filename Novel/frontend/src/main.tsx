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
import SignInPages from './page/authentication/Login'
import Test from './page/test/tests'
import {createBrowserRouter,RouterProvider,Router,Link} from 'react-router-dom'


                    // <Dropdown.Item href="/profile">โปรไฟล์ของฉัน</Dropdown.Item>
                    // <Dropdown.Item href="/writer">งานเขียน</Dropdown.Item>
                    // <Dropdown.Item href="/bookself">ชั้นหนังสือ</Dropdown.Item>
                    // <Dropdown.Item href="/Payment">เหรียญ  & ประวัติธุรกรรม</Dropdown.Item>
                    // <Dropdown.Item href="/settings">ตั้งค่า</Dropdown.Item>
                    // <Dropdown.Item href="/logout">ออกจากระบบ</Dropdown.Item>

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
  },
  {
    path: "/a",
    element:<SignInPages/>
  },
  {
    path: "/test",
    element:<Test/>
  }
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
   
  </React.StrictMode>
)
