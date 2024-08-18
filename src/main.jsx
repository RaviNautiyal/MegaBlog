import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './Store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import MyPost from "./pages/MP.jsx";
import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
              
                    <Login />
             
            ),
        },
        {
            path: "/signup",
            element: (
              
                    <Signup />
           
            ),
        },
        {
            path: "/all-posts",
            element: (
                        <AllPosts />
       
            ),
        },
        {
            path: "/add-post",
            element: (
         
                    <AddPost />
      
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
              
                    <EditPost />
              
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "my-post",
            element: <MyPost/>
        }
    ],
},
])
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <RouterProvider router = {router}> 

    </RouterProvider>
    </Provider>

)
